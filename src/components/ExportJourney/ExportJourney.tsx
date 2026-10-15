import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ORIGIN, DESTINATIONS, GeoLocation } from './destinations';
import { GlobeTerrainScene } from './GlobeTerrainScene';
import { calculateGreatCircleDistanceKm } from './geospatial';
import {
  Play,
  ChevronRight,
  ChevronLeft,
  Pause,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { CountryFlag } from './CountryFlag';
import './ExportJourney.css';

export interface ExportJourneyProps {
  onNavigate?: (path: string) => void;
  onSelectCountry?: (country: string) => void;
}

export const ExportJourney: React.FC<ExportJourneyProps> = ({ onNavigate, onSelectCountry }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<GlobeTerrainScene | null>(null);

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<GeoLocation>(DESTINATIONS[0]);
  const [tourIndex, setTourIndex] = useState(0);
  const [isTourPaused, setIsTourPaused] = useState(false);
  const [journeyPhase, setJourneyPhase] = useState<'origin' | 'flying' | 'arrived'>('origin');
  const speedMultiplier = 1.0;

  // 3D Screen Projected Pins for on-screen label positioning
  const [screenPins, setScreenPins] = useState<{
    [id: string]: { x: number; y: number; visible: boolean };
  }>({});

  const tourTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Distance calculation
  const totalDistanceKm = calculateGreatCircleDistanceKm(
    ORIGIN.latitude,
    ORIGIN.longitude,
    selectedDestination.latitude,
    selectedDestination.longitude
  );

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new GlobeTerrainScene(containerRef.current, {
      onDestinationClick: (dest) => goToDestination(dest),
      onPhaseChange: (phase) => setJourneyPhase(phase),
    });
    sceneRef.current = scene;

    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  // Update 3D on-screen coordinates for active destination pin and origin beacon
  useEffect(() => {
    let animId: number;
    const updatePins = () => {
      if (sceneRef.current && !sceneRef.current.isDisposed) {
        const pinsMap: { [id: string]: { x: number; y: number; visible: boolean } } = {};
        // Active destination callout hovering above 3D spire
        pinsMap[selectedDestination.id] = sceneRef.current!.projectToScreen(
          selectedDestination.latitude,
          selectedDestination.longitude,
          6.0
        );
        // Origin Farm (Denkanikottai / Bengaluru)
        pinsMap['origin'] = sceneRef.current!.projectToScreen(
          ORIGIN.latitude,
          ORIGIN.longitude,
          1.8
        );
        setScreenPins(pinsMap);
      }
      animId = requestAnimationFrame(updatePins);
    };

    animId = requestAnimationFrame(updatePins);
    return () => cancelAnimationFrame(animId);
  }, [selectedDestination.id]);

  // Initial load transition: Earth in space -> Zoom to Denkanikottai -> Launch to Destination 1 (UK)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const lastAnimatedIndexRef = useRef<number | null>(null);

  // Core navigation function to fly from Denkanikottai to selected destination
  const goToDestination = useCallback(
    (dest: GeoLocation) => {
      const idx = DESTINATIONS.findIndex((d) => d.id === dest.id);
      if (idx !== -1) {
        lastAnimatedIndexRef.current = idx;
        setTourIndex(idx);
      }
      setSelectedDestination(dest);
      if (sceneRef.current) {
        sceneRef.current.animateJourneySequence(dest, false);
      }
    },
    []
  );

  // Automated 21-Country Tour Loop (Plays automatically on load: Globe -> Denkanikottai -> Country)
  useEffect(() => {
    if (isLoading) return;

    // Trigger animation sequence (Globe -> Denkanikottai -> Destination)
    if (lastAnimatedIndexRef.current !== tourIndex) {
      const isFirst = lastAnimatedIndexRef.current === null;
      lastAnimatedIndexRef.current = tourIndex;
      const currentDest = DESTINATIONS[tourIndex];
      setSelectedDestination(currentDest);
      if (sceneRef.current) {
        sceneRef.current.animateJourneySequence(currentDest, isFirst);
      }
    }

    if (isTourPaused) {
      if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
      return;
    }

    // Sequence duration per destination: ~3.5s journey animation + ~4.0s arrival dwell = 7.5s
    const dwellMs = 7500 / speedMultiplier;

    tourTimerRef.current = setTimeout(() => {
      setTourIndex((prev) => (prev + 1) % DESTINATIONS.length);
    }, dwellMs);

    return () => {
      if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
    };
  }, [isLoading, tourIndex, isTourPaused, speedMultiplier]);

  // Controls
  const handleNext = () => {
    const nextIdx = (tourIndex + 1) % DESTINATIONS.length;
    setTourIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (tourIndex - 1 + DESTINATIONS.length) % DESTINATIONS.length;
    setTourIndex(prevIdx);
  };

  const togglePause = () => {
    setIsTourPaused((prev) => !prev);
  };

  const handleNavClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="export-journey-container">
      {/* 3D WebGL Canvas Viewport */}
      <div ref={containerRef} className="export-journey-canvas-wrap" />

      {/* 3D Floating Active Callouts on the Globe */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Active Destination Callout hovering above 3D spire */}
        {screenPins[selectedDestination.id]?.visible && (
          <div
            style={{
              left: `${screenPins[selectedDestination.id].x}px`,
              top: `${screenPins[selectedDestination.id].y}px`,
              transform: 'translate(-50%, -100%) translateY(-14px)',
            }}
            className="absolute pointer-events-none z-20 transition-transform duration-75"
          >
            <div className="bg-white/95 backdrop-blur-md text-[#1e3926] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-lg border border-[#f59e0b] sm:border-2 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
              <CountryFlag
                code={selectedDestination.countryCode}
                className="w-4 sm:w-5 h-3 sm:h-3.5 object-cover rounded shadow-xs"
              />
              <span className="font-extrabold text-[11px] sm:text-xs text-[#1e3926]">{selectedDestination.country}</span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#d97706] bg-[#fef3c7] px-1 sm:px-1.5 py-0.5 rounded">
                {selectedDestination.airportCode}
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#58645c] font-medium hidden sm:inline">{selectedDestination.transitHours}</span>
            </div>
            <div className="w-2.5 h-2.5 bg-[#f59e0b] rotate-45 mx-auto -mt-1.5 shadow-sm" />
          </div>
        )}

        {/* Origin Farm Callout (Bengaluru) */}
        {screenPins['origin']?.visible && (
          <div
            style={{
              left: `${screenPins['origin'].x}px`,
              top: `${screenPins['origin'].y}px`,
              transform: 'translate(-50%, -100%) translateY(-12px)',
            }}
            className="absolute pointer-events-none z-15 transition-transform duration-75"
          >
            <div className="bg-[#1e3926] text-white text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md flex items-center gap-1 sm:gap-1.5 border border-[#10b981] whitespace-nowrap">
              <CountryFlag code="in" className="w-3.5 sm:w-4 h-2 sm:h-2.5 object-cover rounded-xs" />
              <span>Iris Estate (Denkanikottai)</span>
            </div>
            <div className="w-1.5 h-1.5 bg-[#1e3926] rotate-45 mx-auto -mt-1" />
          </div>
        )}
      </div>

      {/* Subtle Vignette */}
      <div className="export-journey-vignette" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="export-journey-loading">
          <div className="loading-brand">Iris Biotech</div>
          <div className="loading-text">Loading 21-Country Export Flight Animation...</div>
          <div className="loading-bar-wrap">
            <div className="loading-bar-progress" />
          </div>
        </div>
      )}

      {/* TOP HEADER BAR */}
      <header className="export-journey-header">
        <div className="export-journey-brand">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick('/export/')}
              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-[#1e3926] transition-colors cursor-pointer mr-1 shadow-sm shrink-0"
              title="Return to Export Page"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <span className="brand-title">Iris Biotech</span>
          </div>
          <span className="brand-subtitle">
            <span className="hidden sm:inline">Global Flower Export Tour · </span>21 Verified Destinations
          </span>
        </div>
      </header>

      {/* AUTOMATED TOUR FLOATING CONTROL BAR (Top Center) */}
      <div className="tour-control-bar">
        <div className="tour-indicator">
          <span className="tour-pulse" />
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            {journeyPhase === 'origin' ? (
              <div className="flex items-center gap-1.5 min-w-0">
                <CountryFlag code="in" className="w-4 sm:w-4.5 h-3 sm:h-3.5 object-cover rounded-xs shadow-xs shrink-0" />
                <span className="tour-step-text">
                  <span className="text-[#58645c] font-medium">Origin: </span>
                  <span className="font-extrabold text-[#1e3926]">Denkanikottai (BLR)</span>
                </span>
              </div>
            ) : journeyPhase === 'flying' ? (
              <div className="flex items-center gap-1.5 min-w-0">
                <CountryFlag code="in" className="w-3.5 h-2.5 object-cover rounded-xs shadow-xs shrink-0" />
                <span className="text-[10px] font-bold text-[#d97706]">✈</span>
                <CountryFlag code={selectedDestination.countryCode} className="w-4 sm:w-4.5 h-3 sm:h-3.5 object-cover rounded-xs shadow-xs shrink-0" />
                <span className="tour-step-text truncate">
                  <span className="text-[#58645c] font-medium hidden sm:inline">Flight Trajectory: </span>
                  <span className="font-extrabold text-[#1e3926]">BLR ➔ {selectedDestination.airportCode} ({selectedDestination.country})</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <CountryFlag
                  code={selectedDestination.countryCode}
                  className="w-4 sm:w-4.5 h-3 sm:h-3.5 object-cover rounded-xs shadow-xs shrink-0"
                />
                <span className="tour-step-text">
                  <span className="hidden sm:inline">Destination </span>{tourIndex + 1}/21: {selectedDestination.country}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button onClick={handlePrev} className="tour-btn" title="Previous Country">
            <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Prev</span>
          </button>

          <button
            onClick={togglePause}
            className="tour-btn"
            title={isTourPaused ? 'Resume Auto Tour' : 'Pause Auto Tour'}
          >
            {isTourPaused ? (
              <>
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-white" />
                <span>Play</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                <span>Pause</span>
              </>
            )}
          </button>

          <button onClick={handleNext} className="tour-btn" title="Next Country">
            <span className="hidden xs:inline">Next</span>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>

      {/* ACTIVE DESTINATION CARD (Bottom Left - White & Dark Green) */}
      <div className="export-journey-origin-card">
        <div className="origin-badge">
          <div className="origin-badge-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span>
              {journeyPhase === 'origin'
                ? 'Origin: Denkanikottai Hub'
                : journeyPhase === 'flying'
                ? `In-Flight: BLR ✈ ${selectedDestination.airportCode}`
                : `Destination ${tourIndex + 1} / 21`}
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-[#1e3926] bg-[#f4f6f4] px-1.5 sm:px-2 py-0.5 rounded border border-[#1e3926]/15">
            {selectedDestination.airportCode || 'AIR CARGO'}
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 mt-1.5 sm:mt-2 mb-1">
          <CountryFlag
            code={selectedDestination.countryCode}
            className="w-8 h-5.5 sm:w-10 sm:h-7 object-cover rounded-md shadow-sm border border-[#1e3926]/20 shrink-0"
          />
          <div className="min-w-0">
            <h1 className="origin-title truncate">{selectedDestination.country}</h1>
            <div className="origin-subtitle truncate">
              {selectedDestination.city} · {selectedDestination.subtext || 'Air Cargo Gateway'}
            </div>
          </div>
        </div>

        {/* Progress Bar through the 21 countries */}
        <div className="tour-progress-track">
          <div
            className="tour-progress-bar"
            style={{ width: `${((tourIndex + 1) / DESTINATIONS.length) * 100}%` }}
          />
        </div>

        {/* Route Metrics Grid */}
        <div className="origin-specs">
          <div className="hidden sm:block">
            <div className="spec-label">Direct Air Cargo Transit</div>
            <div className="spec-value text-[#1e3926]">
              {selectedDestination.transitHours}
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="spec-label">Flight Distance (Great Circle)</div>
            <div className="spec-value text-[#1e3926]">
              {totalDistanceKm.toLocaleString()} km
            </div>
          </div>
          <div>
            <div className="spec-label">Origin Farm Hub</div>
            <div className="spec-value text-[#1e3926]">
              🇮🇳 Denkanikottai (20 Ac)
            </div>
          </div>
          <div>
            <div className="spec-label">Cold-Chain Protocol</div>
            <div className="spec-value text-[#10b981]">
              {selectedDestination.coldChainTemp || '2°C – 4°C Monitored'}
            </div>
          </div>
        </div>

        {/* Exported Flower Varieties */}
        {selectedDestination.featuredVarieties && (
          <div className="mt-2.5 sm:mt-3.5 pt-2 sm:pt-2.5 border-t border-[#1e3926]/15">
            <span className="spec-label block mb-1">
              Consigned Export Varieties:
            </span>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {selectedDestination.featuredVarieties.map((v, i) => (
                <span key={i} className="cultivar-tag">
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#1e3926]/15 flex items-center gap-2">
          <button
            onClick={() => {
              if (onSelectCountry) {
                onSelectCountry(selectedDestination.country);
              } else if (onNavigate) {
                onNavigate('/export/#quote-section');
              } else {
                const elem = document.getElementById('quote-section');
                if (elem) {
                  elem.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/export/#quote-section';
                }
              }
            }}
            className="w-full py-2.5 sm:py-3 bg-[#1e3926] hover:bg-[#142a1c] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:scale-[0.99]"
          >
            <span>Request {selectedDestination.country} Wholesale Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Attribution Footer */}
      <div className="export-journey-attribution">
        <span>Iris Biotech Private Limited</span>
        <span>•</span>
        <span>20-Acre High-Precision Floriculture Farm</span>
        <span>•</span>
        <span>21 Global Export Destinations</span>
      </div>
    </div>
  );
};
