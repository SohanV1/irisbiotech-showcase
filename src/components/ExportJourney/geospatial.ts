import * as THREE from 'three';
import { GeoLocation } from './destinations';

export const GLOBE_RADIUS = 50;

/**
 * Converts Geographic (lat, lon, altitude) to 3D Cartesian Vector3 on a sphere
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  altitude: number = 0,
  radius: number = GLOBE_RADIUS
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const r = radius + altitude;

  const x = -r * Math.sin(phi) * Math.cos(theta);
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

/**
 * Converts 3D Cartesian Vector3 back to (lat, lon) on sphere
 */
export function vector3ToLatLon(v: THREE.Vector3): { lat: number; lon: number } {
  const norm = v.clone().normalize();
  const lat = 90 - Math.acos(norm.y) * (180 / Math.PI);
  let lon = (Math.atan2(norm.z, -norm.x) * (180 / Math.PI)) - 180;
  while (lon < -180) lon += 360;
  while (lon > 180) lon -= 360;
  return { lat, lon };
}

/**
 * Haversine formula for Great-Circle surface distance in kilometers
 */
export function calculateGreatCircleDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Generates an array of 3D Vector3 points along the geodesic Great-Circle arc
 * with a dynamic altitude parabolic curve.
 */
export function generateGreatCirclePoints(
  origin: GeoLocation,
  destination: GeoLocation,
  numSegments: number = 100,
  maxPeakAltitude: number = 18
): THREE.Vector3[] {
  const vOrigin = latLonToVector3(origin.latitude, origin.longitude, 0.05).normalize();
  const vDest = latLonToVector3(destination.latitude, destination.longitude, 0.05).normalize();

  const angle = vOrigin.angleTo(vDest);
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= numSegments; i++) {
    const t = i / numSegments;
    // Slerp on unit sphere
    const interpolated = new THREE.Vector3().copy(vOrigin);
    interpolated.lerp(vDest, 0); // initial
    
    // Quaternion Slerp calculation
    const q1 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vOrigin);
    const q2 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vDest);
    const qOut = new THREE.Quaternion();
    qOut.slerpQuaternions(q1, q2, t);
    const currentDirection = new THREE.Vector3(0, 1, 0).applyQuaternion(qOut).normalize();

    // Parabolic altitude arc: sin(pi * t)
    const altitudeArc = Math.sin(Math.PI * t) * maxPeakAltitude + 0.15;
    const finalPoint = currentDirection.clone().multiplyScalar(GLOBE_RADIUS + altitudeArc);
    points.push(finalPoint);
  }

  return points;
}

/**
 * Computes camera position and lookAt target along the flight path for progress t in [0, 1]
 */
export interface FlightCameraState {
  cameraPosition: THREE.Vector3;
  lookAtTarget: THREE.Vector3;
  altitudeKm: number;
  progressPercent: number;
  currentLat: number;
  currentLon: number;
}

export function sampleFlightTrajectory(
  origin: GeoLocation,
  destination: GeoLocation,
  progress: number, // 0.0 to 1.0
  lookAheadOffset: number = 0.04
): FlightCameraState {
  const clampedT = Math.max(0, Math.min(1, progress));

  const vOrigin = latLonToVector3(origin.latitude, origin.longitude, 0).normalize();
  const vDest = latLonToVector3(destination.latitude, destination.longitude, 0).normalize();

  // Camera point interpolation
  const qOrigin = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vOrigin);
  const qDest = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vDest);

  const qCurrent = new THREE.Quaternion().slerpQuaternions(qOrigin, qDest, clampedT);
  const currentDir = new THREE.Vector3(0, 1, 0).applyQuaternion(qCurrent).normalize();

  // Dynamic Altitude Profile:
  // Starts low at farm (~1.8 units above surface), climbs up to ~45 units in high-orbit,
  // descends to ~1.8 units at destination.
  let cameraHeight: number;
  if (clampedT < 0.15) {
    // Takeoff phase
    const subT = clampedT / 0.15;
    cameraHeight = 1.8 + Math.pow(subT, 1.5) * 22;
  } else if (clampedT > 0.85) {
    // Final descent phase
    const subT = (clampedT - 0.85) / 0.15;
    cameraHeight = 24 - Math.pow(subT, 0.8) * 22.2;
  } else {
    // Cruise / high-orbital overview
    const midT = (clampedT - 0.15) / 0.7;
    const peakAltitude = 42;
    cameraHeight = 23.8 + Math.sin(Math.PI * midT) * (peakAltitude - 23.8);
  }

  // Camera position along normal vector with slight backward offset for cinematic perspective
  const cameraPosition = currentDir.clone().multiplyScalar(GLOBE_RADIUS + cameraHeight);

  // Look ahead along trajectory for lookAt target
  const lookAheadT = Math.min(1, clampedT + lookAheadOffset);
  const qLookAhead = new THREE.Quaternion().slerpQuaternions(qOrigin, qDest, lookAheadT);
  const lookAheadDir = new THREE.Vector3(0, 1, 0).applyQuaternion(qLookAhead).normalize();

  // Target stays closer to surface to give great landscape/skyline horizon framing
  const lookAtTarget = lookAheadDir.clone().multiplyScalar(GLOBE_RADIUS + (cameraHeight * 0.12));

  // Current lat/lon for HUD
  const { lat, lon } = vector3ToLatLon(currentDir);
  const totalDistanceKm = calculateGreatCircleDistanceKm(
    origin.latitude,
    origin.longitude,
    destination.latitude,
    destination.longitude
  );
  const simulatedAltitudeKm = Math.round(
    (cameraHeight / 45) * 11500 + 800 * (1 - clampedT)
  );

  return {
    cameraPosition,
    lookAtTarget,
    altitudeKm: simulatedAltitudeKm,
    progressPercent: Math.round(clampedT * 100),
    currentLat: parseFloat(lat.toFixed(4)),
    currentLon: parseFloat(lon.toFixed(4)),
  };
}

/**
 * Computes high-altitude orbital camera trajectory for simultaneous 21-country global flight
 */
export function sampleGlobalNetworkTrajectory(
  origin: GeoLocation,
  progress: number
): FlightCameraState {
  const clampedT = Math.max(0, Math.min(1, progress));

  // Farm origin vector
  const vOrigin = latLonToVector3(origin.latitude, origin.longitude, 0).normalize();

  // Orbital overview center vector (centered above Middle East/South Asia/Indian Ocean)
  const overviewLat = 22;
  const overviewLon = 62 - clampedT * 14; // gentle orbital drift
  const vOrbit = latLonToVector3(overviewLat, overviewLon, 0).normalize();

  let cameraPos: THREE.Vector3;
  let lookAtTarget: THREE.Vector3;
  let simulatedAltitudeKm: number;

  if (clampedT < 0.22) {
    // Phase 1: Farm Takeoff & Rapid Climb (t = 0 to 0.22)
    const subT = clampedT / 0.22;
    const eased = Math.pow(subT, 1.8);

    const qOrigin = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vOrigin);
    const qOrbit = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vOrbit);
    const qCurrent = new THREE.Quaternion().slerpQuaternions(qOrigin, qOrbit, eased * 0.6);
    const currentDir = new THREE.Vector3(0, 1, 0).applyQuaternion(qCurrent).normalize();

    const cameraHeight = 4.8 + eased * 65; // from 4.8 to ~70 units above globe
    cameraPos = currentDir.multiplyScalar(GLOBE_RADIUS + cameraHeight);

    const farmTarget = latLonToVector3(origin.latitude, origin.longitude, 0.5);
    const centerTarget = latLonToVector3(18, 72, 0);
    lookAtTarget = farmTarget.clone().lerp(centerTarget, eased);

    simulatedAltitudeKm = Math.round(850 + eased * 8500);
  } else if (clampedT > 0.82) {
    // Phase 3: Global Delivery & Orbit Stabilization (t = 0.82 to 1.0)
    const subT = (clampedT - 0.82) / 0.18;
    const eased = Math.sin((subT * Math.PI) / 2);

    const qOrbit = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vOrbit);
    const currentDir = new THREE.Vector3(0, 1, 0).applyQuaternion(qOrbit).normalize();

    const cameraHeight = 110 - eased * 12; // gently stabilize at ~98
    cameraPos = currentDir.multiplyScalar(GLOBE_RADIUS + cameraHeight);

    const centerTarget = latLonToVector3(20, 56, 0);
    lookAtTarget = centerTarget;

    simulatedAltitudeKm = Math.round(32000 + (1 - eased) * 2000);
  } else {
    // Phase 2: Planetary Orbital Overview (t = 0.22 to 0.82)
    const midT = (clampedT - 0.22) / 0.6;
    const peakHeight = 115;
    const cameraHeight = 70 + Math.sin(midT * Math.PI) * (peakHeight - 70);

    const qOrbit = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vOrbit);
    const currentDir = new THREE.Vector3(0, 1, 0).applyQuaternion(qOrbit).normalize();
    cameraPos = currentDir.multiplyScalar(GLOBE_RADIUS + cameraHeight);

    const centerTarget = latLonToVector3(20, 62 - midT * 8, 0);
    lookAtTarget = centerTarget;

    simulatedAltitudeKm = Math.round(15000 + Math.sin(midT * Math.PI) * 19000);
  }

  const { lat, lon } = vector3ToLatLon(cameraPos);

  return {
    cameraPosition: cameraPos,
    lookAtTarget,
    altitudeKm: simulatedAltitudeKm,
    progressPercent: Math.round(clampedT * 100),
    currentLat: parseFloat(lat.toFixed(4)),
    currentLon: parseFloat(lon.toFixed(4)),
  };
}

/**
 * Generates an array of geographic coordinates with parabolic altitude in meters
 * for rendering directly on Google Maps 3D (<gmp-polyline-3d>)
 */
export function generateGeodesic3DCoordinates(
  origin: GeoLocation,
  destination: GeoLocation,
  numSegments: number = 80,
  maxAltitudeMeters: number = 250000 // 250 km orbital flight apex
): { lat: number; lng: number; altitude: number }[] {
  const points: { lat: number; lng: number; altitude: number }[] = [];

  const lat1 = (origin.latitude * Math.PI) / 180;
  const lon1 = (origin.longitude * Math.PI) / 180;
  const lat2 = (destination.latitude * Math.PI) / 180;
  const lon2 = (destination.longitude * Math.PI) / 180;

  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin((lat1 - lat2) / 2), 2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon1 - lon2) / 2), 2)
      )
    );

  for (let i = 0; i <= numSegments; i++) {
    const f = i / numSegments;
    let lat: number;
    let lon: number;

    if (d === 0) {
      lat = origin.latitude;
      lon = origin.longitude;
    } else {
      const A = Math.sin((1 - f) * d) / Math.sin(d);
      const B = Math.sin(f * d) / Math.sin(d);
      const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
      const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
      const z = A * Math.sin(lat1) + B * Math.sin(lat2);

      lat = (Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * 180) / Math.PI;
      lon = (Math.atan2(y, x) * 180) / Math.PI;
    }

    const altitude = Math.sin(Math.PI * f) * maxAltitudeMeters + 850;

    points.push({
      lat: parseFloat(lat.toFixed(5)),
      lng: parseFloat(lon.toFixed(5)),
      altitude: Math.round(altitude),
    });
  }

  return points;
}


