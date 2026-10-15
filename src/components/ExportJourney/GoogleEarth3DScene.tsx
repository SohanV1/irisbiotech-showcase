import React, { useEffect, useRef, useState } from 'react';
import { ORIGIN, DESTINATIONS, GeoLocation } from './destinations';
import { generateGeodesic3DCoordinates } from './geospatial';
import { Globe2, Key, Sparkles, AlertCircle, ExternalLink, Play } from 'lucide-react';

interface GoogleEarth3DSceneProps {
  apiKey: string;
  selectedDestination: GeoLocation;
  flightMode: 'simultaneous' | 'single';
  flightState: 'idle' | 'flying' | 'paused' | 'arrived';
  speedMultiplier: number;
  onFlightComplete: () => void;
  onOpenKeyModal: () => void;
  onSwitchToThreeJs: () => void;
}

export const GoogleEarth3DScene: React.FC<GoogleEarth3DSceneProps> = ({
  apiKey,
  selectedDestination,
  flightMode,
  flightState,
  speedMultiplier,
  onFlightComplete,
  onOpenKeyModal,
  onSwitchToThreeJs,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const map3dRef = useRef<any>(null);
  const polylinesRef = useRef<any[]>([]);
  const markersRef = useRef<any[]>([]);

  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // 1. Dynamically Load Google Maps 3D Maps JavaScript API
  useEffect(() => {
    if (!apiKey) {
      setIsApiLoaded(false);
      return;
    }

    // Check if already loaded with maps3d
    if ((window as any).google?.maps?.maps3d) {
      setIsApiLoaded(true);
      return;
    }

    const scriptId = 'google-maps-3d-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=alpha&libraries=maps3d,marker`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        if ((window as any).google?.maps?.maps3d) {
          setIsApiLoaded(true);
          setLoadError(null);
        } else {
          setLoadError('Google 3D Maps library not initialized. Verify your API key has Map Tiles API enabled.');
        }
      };

      script.onerror = () => {
        setLoadError('Failed to load Google Maps 3D API. Check your internet connection or API key permissions.');
      };

      document.head.appendChild(script);
    } else {
      // Script tag exists, wait for maps3d initialization
      const checkInterval = setInterval(() => {
        if ((window as any).google?.maps?.maps3d) {
          clearInterval(checkInterval);
          setIsApiLoaded(true);
        }
      }, 200);

      setTimeout(() => clearInterval(checkInterval), 6000);
    }
  }, [apiKey]);

  // 2. Initialize <gmp-map-3d> Web Component inside container
  useEffect(() => {
    if (!isApiLoaded || !containerRef.current) return;

    // Clear previous elements
    containerRef.current.innerHTML = '';
    polylinesRef.current = [];
    markersRef.current = [];

    try {
      // Create root <gmp-map-3d> Web Component
      const map3d = document.createElement('gmp-map-3d') as any;
      map3d.style.width = '100%';
      map3d.style.height = '100%';
      map3d.style.display = 'block';
      map3d.setAttribute('center', `${ORIGIN.latitude},${ORIGIN.longitude},850`);
      map3d.setAttribute('tilt', '65');
      map3d.setAttribute('heading', '30');
      map3d.setAttribute('range', '2500');

      map3dRef.current = map3d;
      containerRef.current.appendChild(map3d);

      // Add Origin Farm 3D Marker
      const originMarker = document.createElement('gmp-marker-3d') as any;
      originMarker.setAttribute('position', `${ORIGIN.latitude},${ORIGIN.longitude},850`);
      originMarker.setAttribute('altitude-mode', 'RELATIVE_TO_GROUND');
      originMarker.setAttribute('title', 'Iris Biotech Farm (Denkanikottai)');
      map3d.appendChild(originMarker);

      // Create 3D Polylines for 21 Destinations
      DESTINATIONS.forEach((dest) => {
        const isTarget = dest.id === selectedDestination.id;
        const coords = generateGeodesic3DCoordinates(ORIGIN, dest, 60, 350000);

        const polyline = document.createElement('gmp-polyline-3d') as any;
        polyline.setAttribute('altitude-mode', 'RELATIVE_TO_GROUND');
        polyline.setAttribute('stroke-color', isTarget ? '#F59E0B' : '#2DD4BF');
        polyline.setAttribute('stroke-width', isTarget ? '4' : '2');
        polyline.coordinates = coords;

        map3d.appendChild(polyline);
        polylinesRef.current.push({ dest, polyline });

        // Destination 3D Pin Marker
        const destMarker = document.createElement('gmp-marker-3d') as any;
        destMarker.setAttribute('position', `${dest.latitude},${dest.longitude},${dest.altitudeKm * 1000}`);
        destMarker.setAttribute('altitude-mode', 'RELATIVE_TO_GROUND');
        destMarker.setAttribute('title', `${dest.name}, ${dest.country}`);
        map3d.appendChild(destMarker);
        markersRef.current.push({ dest, marker: destMarker });
      });
    } catch (err: any) {
      console.error('Error initializing Google Earth 3D:', err);
      setLoadError(err.message || 'Error rendering Google 3D Maps element.');
    }
  }, [isApiLoaded]);

  // 3. Update Polylines visibility / highlight when destination or mode changes
  useEffect(() => {
    polylinesRef.current.forEach(({ dest, polyline }) => {
      const isTarget = dest.id === selectedDestination.id;
      if (flightMode === 'simultaneous') {
        polyline.style.display = 'block';
        polyline.setAttribute('stroke-color', isTarget ? '#F59E0B' : '#2DD4BF');
        polyline.setAttribute('stroke-width', isTarget ? '3.5' : '2');
      } else {
        polyline.style.display = isTarget ? 'block' : 'none';
        polyline.setAttribute('stroke-color', '#F59E0B');
        polyline.setAttribute('stroke-width', '4');
      }
    });
  }, [selectedDestination, flightMode]);

  // 4. Trigger Camera Flight on flightState === 'flying'
  useEffect(() => {
    if (!map3dRef.current || flightState !== 'flying') return;

    const baseDuration = flightMode === 'simultaneous' ? 18000 : 16000;
    const durationMillis = Math.round(baseDuration / speedMultiplier);

    if (flightMode === 'simultaneous') {
      // Pull back to high-orbital panoramic view of South Asia / Middle East / Europe / Asia
      map3dRef.current.flyCameraTo({
        endCamera: {
          center: { lat: 22.0, lng: 58.0, altitude: 7500000 },
          tilt: 28,
          heading: 5,
          range: 9500000,
        },
        durationMillis,
      });
    } else {
      // Fly to the selected destination airport / city
      map3dRef.current.flyCameraTo({
        endCamera: {
          center: {
            lat: selectedDestination.latitude,
            lng: selectedDestination.longitude,
            altitude: Math.max(350, selectedDestination.altitudeKm * 1000 + 300),
          },
          tilt: 58,
          heading: 40,
          range: 6000,
        },
        durationMillis,
      });
    }

    const timer = setTimeout(() => {
      onFlightComplete();
    }, durationMillis);

    return () => clearTimeout(timer);
  }, [flightState, flightMode, selectedDestination, speedMultiplier, onFlightComplete]);

  // If no API Key is configured yet
  if (!apiKey) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#040806] text-[#FAF8F5] z-20">
        <div className="max-w-md w-full bg-[#08100C]/90 border border-[#2DD4BF]/40 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 flex items-center justify-center text-[#2DD4BF]">
            <Globe2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold tracking-wide">Google Earth 3D Engine</h2>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Experience the 21-country floriculture export journey on real Google Earth 3D terrain and photorealistic buildings.
            </p>
          </div>

          <div className="bg-[#143021]/60 border border-[#2DD4BF]/20 rounded-xl p-3.5 text-left text-xs text-[#CBD5E1] space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#F59E0B] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Requires Google Maps API Key</span>
            </div>
            <p className="text-[11px]">
              Enable <strong>Maps JavaScript API</strong> and <strong>Map Tiles API</strong> in your Google Cloud Console.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onOpenKeyModal}
              className="flex-1 px-4 py-3 bg-[#2DD4BF] text-[#08100C] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#14B8A6] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#2DD4BF]/20"
            >
              <Key className="w-4 h-4" /> Enter API Key
            </button>
            <button
              onClick={onSwitchToThreeJs}
              className="px-4 py-3 bg-white/5 border border-white/15 text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all cursor-pointer"
            >
              Use Three.js Earth
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If loading error occurred
  if (loadError) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#040806] text-[#FAF8F5] z-20">
        <div className="max-w-md w-full bg-[#180C0A]/90 border border-red-500/40 rounded-2xl p-6 text-center space-y-4 shadow-2xl backdrop-blur-xl">
          <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-red-300">Google 3D Maps Notice</h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed">{loadError}</p>
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={onOpenKeyModal}
              className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/40 rounded-lg text-xs font-semibold hover:bg-red-500/30 cursor-pointer"
            >
              Update API Key
            </button>
            <button
              onClick={onSwitchToThreeJs}
              className="px-4 py-2 bg-white/10 text-white rounded-lg text-xs font-semibold hover:bg-white/20 cursor-pointer"
            >
              Switch to Three.js
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
