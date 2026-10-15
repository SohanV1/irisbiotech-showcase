import React, { useEffect, useRef, useState } from 'react';
import { ORIGIN, DESTINATIONS, GeoLocation } from './destinations';
import { generateGeodesic3DCoordinates } from './geospatial';
import { Globe2, AlertCircle, ZoomIn, Eye, MapPin } from 'lucide-react';

interface CesiumGlobeSceneProps {
  selectedDestination: GeoLocation;
  flightMode: 'simultaneous' | 'single';
  flightState: 'idle' | 'flying' | 'paused' | 'arrived';
  speedMultiplier: number;
  onFlightComplete: () => void;
  onProgressUpdate?: (progress: number) => void;
}

export const CesiumGlobeScene: React.FC<CesiumGlobeSceneProps> = ({
  selectedDestination,
  flightMode,
  flightState,
  speedMultiplier,
  onFlightComplete,
  onProgressUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<any>(null);
  const cargoProgressRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const polylineEntitiesRef = useRef<{ dest: GeoLocation; entity: any; cargoEntity: any }[]>([]);

  const [isCesiumLoaded, setIsCesiumLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [viewLevel, setViewLevel] = useState<'ground' | 'regional' | 'orbit'>('ground');

  // 1. Load CesiumJS dynamically via CDN
  useEffect(() => {
    if ((window as any).Cesium) {
      setIsCesiumLoaded(true);
      return;
    }

    const cssId = 'cesium-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cesium/1.119.0/Widgets/widgets.css';
      document.head.appendChild(link);
    }

    const scriptId = 'cesium-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cesium/1.119.0/Cesium.js';
      script.async = true;

      script.onload = () => {
        if ((window as any).Cesium) {
          setIsCesiumLoaded(true);
        } else {
          setLoadError('Failed to initialize Cesium 3D Globe.');
        }
      };

      script.onerror = () => {
        setLoadError('Failed to load Cesium runtime. Check network connection.');
      };

      document.head.appendChild(script);
    }
  }, []);

  // 2. Initialize Cesium.Viewer with High-Resolution Satellite & Ground Details
  useEffect(() => {
    if (!isCesiumLoaded || !containerRef.current) return;
    const Cesium = (window as any).Cesium;
    if (!Cesium) return;

    try {
      containerRef.current.innerHTML = '';
      polylineEntitiesRef.current = [];

      // Base High-Resolution Satellite Imagery (Esri World Imagery)
      const imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
        enablePickFeatures: false,
      });

      const viewer = new Cesium.Viewer(containerRef.current, {
        imageryProvider: imageryProvider,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        animation: false,
        fullscreenButton: false,
        creditContainer: document.createElement('div'), // Hide footer watermark
      });

      viewerRef.current = viewer;

      // Add Hybrid High-Contrast Ground Labels & Places Layer (Cities, Roads, Landmarks)
      try {
        const labelsProvider = new Cesium.ArcGisMapServerImageryProvider({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer',
          enablePickFeatures: false,
        });
        viewer.imageryLayers.addImageryProvider(labelsProvider);

        const transportProvider = new Cesium.ArcGisMapServerImageryProvider({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer',
          enablePickFeatures: false,
        });
        viewer.imageryLayers.addImageryProvider(transportProvider);
      } catch (e) {
        console.warn('Overlay layers optional load:', e);
      }

      // Keep daylight illumination bright across the globe for crystal-clear ground features
      viewer.scene.globe.enableLighting = false; // Prevents pitch-black night shadows over ground
      viewer.scene.globe.depthTestAgainstTerrain = false;
      viewer.scene.skyAtmosphere.show = true;
      viewer.scene.globe.maximumScreenSpaceError = 1.33; // Ultra-crisp ground texture level of detail

      // Initial Camera at Close-Range Ground Elevation over Iris Biotech Farm
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(ORIGIN.longitude, ORIGIN.latitude, 1100),
        orientation: {
          heading: Cesium.Math.toRadians(15),
          pitch: Cesium.Math.toRadians(-45),
          roll: 0,
        },
      });

      // 3. Build 3D Greenhouse Estate Footprint & Buildings at Denkanikottai
      // 3.1 Estate Boundary Perimeter Polygon
      viewer.entities.add({
        name: 'Iris Biotech 20-Acre Estate Perimeter',
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            77.7915, 12.5270,
            77.7972, 12.5270,
            77.7972, 12.5222,
            77.7915, 12.5222,
          ]),
          material: Cesium.Color.fromCssColorString('#2DD4BF').withAlpha(0.18),
          outline: true,
          outlineColor: Cesium.Color.fromCssColorString('#2DD4BF'),
          outlineWidth: 3,
        },
      });

      // 3.2 15-Acre High-Tech Dutch Rose Polyhouse Greenhouse Blocks (3D Extruded)
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const minLon = 77.7924 + col * 0.0014;
          const maxLon = minLon + 0.0011;
          const minLat = 12.5238 + row * 0.0009;
          const maxLat = minLat + 0.0007;

          viewer.entities.add({
            name: `Greenhouse Polyhouse Unit ${row * 3 + col + 1} (Taj Mahal & Sweet Avalanche Dutch Roses)`,
            polygon: {
              hierarchy: Cesium.Cartesian3.fromDegreesArray([
                minLon, maxLat,
                maxLon, maxLat,
                maxLon, minLat,
                minLon, minLat,
              ]),
              extrudedHeight: 8,
              material: Cesium.Color.fromCssColorString('#10B981').withAlpha(0.7),
              outline: true,
              outlineColor: Cesium.Color.WHITE.withAlpha(0.85),
              outlineWidth: 2,
            },
          });
        }
      }

      // 3.3 On-Site Cold Storage & Packhouse Facility (12m Extruded Structure)
      viewer.entities.add({
        name: 'Iris Biotech Modern Packhouse & 2°C–4°C Cold Storage',
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            77.7928, 12.5232,
            77.7962, 12.5232,
            77.7962, 12.5226,
            77.7928, 12.5226,
          ]),
          extrudedHeight: 12,
          material: Cesium.Color.fromCssColorString('#F59E0B').withAlpha(0.85),
          outline: true,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
      });

      // 3.4 Origin Estate Glowing 3D Beacon Pin
      viewer.entities.add({
        name: 'Iris Biotech Farm (Origin)',
        position: Cesium.Cartesian3.fromDegrees(ORIGIN.longitude, ORIGIN.latitude, 870),
        point: {
          pixelSize: 14,
          color: Cesium.Color.fromCssColorString('#2DD4BF'),
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 3,
        },
        label: {
          text: '🌿 Iris Biotech Farm (20 Acres)',
          font: 'bold 13px Plus Jakarta Sans, sans-serif',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.fromCssColorString('#060C08'),
          outlineWidth: 4,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -14),
        },
      });

      // 4. Create 21 Geodesic Glowing Flight Arcs + Moving Cargo Pods
      DESTINATIONS.forEach((dest) => {
        const isTarget = dest.id === selectedDestination.id;
        const coords = generateGeodesic3DCoordinates(ORIGIN, dest, 80, 450000);
        const cartesianPositions = coords.map((c) =>
          Cesium.Cartesian3.fromDegrees(c.lng, c.lat, c.altitude)
        );

        // Glowing Flight Arc
        const polylineEntity = viewer.entities.add({
          name: `${dest.name} Flight Path`,
          polyline: {
            positions: cartesianPositions,
            width: isTarget ? 4.5 : 2.5,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.35,
              color: isTarget
                ? Cesium.Color.fromCssColorString('#F59E0B')
                : Cesium.Color.fromCssColorString('#2DD4BF'),
            }),
          },
        });

        // Destination Airport Pin & Label
        viewer.entities.add({
          name: `${dest.name}, ${dest.country}`,
          position: Cesium.Cartesian3.fromDegrees(dest.longitude, dest.latitude, 500),
          point: {
            pixelSize: isTarget ? 11 : 7,
            color: isTarget
              ? Cesium.Color.fromCssColorString('#F59E0B')
              : Cesium.Color.fromCssColorString('#2DD4BF'),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1.5,
          },
          label: {
            text: `✈ ${dest.name} (${dest.country})`,
            font: '11px Plus Jakarta Sans, sans-serif',
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -10),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 16000000),
          },
        });

        // Moving Cargo Vessel Indicator Pod
        const cargoEntity = viewer.entities.add({
          name: `${dest.name} Cargo Pod`,
          position: new Cesium.CallbackProperty(() => {
            const clamped = Math.max(0, Math.min(1, cargoProgressRef.current));
            const idx = Math.min(
              coords.length - 1,
              Math.floor(clamped * (coords.length - 1))
            );
            const c = coords[idx];
            return Cesium.Cartesian3.fromDegrees(c.lng, c.lat, c.altitude);
          }, false),
          point: {
            pixelSize: isTarget ? 12 : 7,
            color: isTarget
              ? Cesium.Color.fromCssColorString('#FEF08A')
              : Cesium.Color.fromCssColorString('#6EE7B7'),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1.5,
          },
        });

        polylineEntitiesRef.current.push({ dest, entity: polylineEntity, cargoEntity });
      });
    } catch (err: any) {
      console.error('Cesium init error:', err);
      setLoadError(err.message || 'Failed to initialize Cesium 3D Globe.');
    }

    return () => {
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [isCesiumLoaded]);

  // 3. Update Polylines visibility when mode or selected destination changes
  useEffect(() => {
    if (!viewerRef.current) return;
    const Cesium = (window as any).Cesium;
    if (!Cesium) return;

    polylineEntitiesRef.current.forEach(({ dest, entity, cargoEntity }) => {
      const isTarget = dest.id === selectedDestination.id;
      if (flightMode === 'simultaneous') {
        entity.show = true;
        cargoEntity.show = true;
        entity.polyline.width = isTarget ? 4.5 : 2.5;
        entity.polyline.material = new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.35,
          color: isTarget
            ? Cesium.Color.fromCssColorString('#F59E0B')
            : Cesium.Color.fromCssColorString('#2DD4BF'),
        });
      } else {
        entity.show = isTarget;
        cargoEntity.show = isTarget;
        entity.polyline.width = 4.5;
        entity.polyline.material = new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.4,
          color: Cesium.Color.fromCssColorString('#F59E0B'),
        });
      }
    });
  }, [selectedDestination, flightMode]);

  // 4. Flight Trigger & Camera Choreography
  useEffect(() => {
    if (!viewerRef.current || flightState !== 'flying') return;
    const Cesium = (window as any).Cesium;
    if (!Cesium) return;

    const viewer = viewerRef.current;
    const baseDuration = flightMode === 'simultaneous' ? 18 : 16;
    const durationSec = baseDuration / speedMultiplier;

    cargoProgressRef.current = 0;
    const startTime = performance.now();

    const animateCargo = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1.0, elapsed / durationSec);
      cargoProgressRef.current = progress;

      if (onProgressUpdate) {
        onProgressUpdate(progress);
      }

      if (progress < 1.0) {
        animationFrameRef.current = requestAnimationFrame(animateCargo);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateCargo);

    if (flightMode === 'simultaneous') {
      setViewLevel('orbit');
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(60.0, 20.0, 11500000),
        orientation: {
          heading: 0,
          pitch: Cesium.Math.toRadians(-88),
          roll: 0,
        },
        duration: durationSec,
        complete: () => {
          cargoProgressRef.current = 1.0;
          onFlightComplete();
        },
      });
    } else {
      setViewLevel('regional');
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          selectedDestination.longitude,
          selectedDestination.latitude,
          Math.max(6000, selectedDestination.altitudeKm * 1000 + 4000)
        ),
        orientation: {
          heading: Cesium.Math.toRadians(35),
          pitch: Cesium.Math.toRadians(-45),
          roll: 0,
        },
        duration: durationSec,
        complete: () => {
          cargoProgressRef.current = 1.0;
          onFlightComplete();
        },
      });
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [flightState, flightMode, selectedDestination, speedMultiplier, onFlightComplete]);

  // Handle return to farm view on idle
  useEffect(() => {
    if (!viewerRef.current || flightState !== 'idle') return;
    const Cesium = (window as any).Cesium;
    if (!Cesium) return;

    cargoProgressRef.current = 0;
    setViewLevel('ground');
    viewerRef.current.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(ORIGIN.longitude, ORIGIN.latitude, 1100),
      orientation: {
        heading: Cesium.Math.toRadians(15),
        pitch: Cesium.Math.toRadians(-45),
        roll: 0,
      },
      duration: 3.5,
    });
  }, [flightState]);

  // Zoom preset helper
  const handleZoomLevel = (level: 'ground' | 'regional' | 'orbit') => {
    if (!viewerRef.current) return;
    const Cesium = (window as any).Cesium;
    if (!Cesium) return;
    const viewer = viewerRef.current;
    setViewLevel(level);

    if (level === 'ground') {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(ORIGIN.longitude, ORIGIN.latitude, 750),
        orientation: {
          heading: Cesium.Math.toRadians(15),
          pitch: Cesium.Math.toRadians(-40),
          roll: 0,
        },
        duration: 2.0,
      });
    } else if (level === 'regional') {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(ORIGIN.longitude, ORIGIN.latitude, 65000),
        orientation: {
          heading: 0,
          pitch: Cesium.Math.toRadians(-75),
          roll: 0,
        },
        duration: 2.0,
      });
    } else {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(60.0, 20.0, 11500000),
        orientation: {
          heading: 0,
          pitch: Cesium.Math.toRadians(-88),
          roll: 0,
        },
        duration: 2.5,
      });
    }
  };

  if (loadError) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#040806] text-[#FAF8F5] z-20">
        <div className="max-w-md w-full bg-[#180C0A]/90 border border-red-500/40 rounded-2xl p-6 text-center space-y-4 shadow-2xl backdrop-blur-xl">
          <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-red-300">Cesium Globe Notice</h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed">{loadError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      {!isCesiumLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#060C08] z-10 text-[#2DD4BF] text-xs">
          <Globe2 className="w-5 h-5 animate-spin mr-2" /> Initializing Cesium 3D Satellite Globe...
        </div>
      )}

      {/* Quick Ground Elevation Preset Controls (Bottom Right) */}
      <div className="absolute bottom-16 right-6 z-20 flex items-center gap-1.5 bg-[#08100C]/90 backdrop-blur-md border border-[#2DD4BF]/30 rounded-full p-1 shadow-2xl">
        <span className="text-[9px] uppercase tracking-wider text-[#88988D] font-bold px-2.5">
          Elevation:
        </span>
        <button
          onClick={() => handleZoomLevel('ground')}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
            viewLevel === 'ground' ? 'bg-[#2DD4BF] text-[#08100C]' : 'text-[#CBD5E1] hover:bg-white/10'
          }`}
          title="Zoom to 20-Acre Farm Estate (750m elevation)"
        >
          Farm (750m)
        </button>
        <button
          onClick={() => handleZoomLevel('regional')}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
            viewLevel === 'regional' ? 'bg-[#2DD4BF] text-[#08100C]' : 'text-[#CBD5E1] hover:bg-white/10'
          }`}
          title="Regional View (Bengaluru & Krishnagiri)"
        >
          Regional (65km)
        </button>
        <button
          onClick={() => handleZoomLevel('orbit')}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
            viewLevel === 'orbit' ? 'bg-[#2DD4BF] text-[#08100C]' : 'text-[#CBD5E1] hover:bg-white/10'
          }`}
          title="Planetary Space Orbit (11,500km elevation)"
        >
          Global Space
        </button>
      </div>

      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
