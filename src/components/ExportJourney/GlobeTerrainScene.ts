import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { GeoLocation, ORIGIN, DESTINATIONS } from './destinations';
import {
  GLOBE_RADIUS,
  latLonToVector3,
  generateGreatCirclePoints,
} from './geospatial';

export interface SceneCallbacks {
  onProgressUpdate?: (progress: number) => void;
  onFlightComplete?: () => void;
  onDestinationClick?: (dest: GeoLocation) => void;
  onPhaseChange?: (phase: 'origin' | 'flying' | 'arrived') => void;
}

/**
 * Spherical linear interpolation between two 3D vectors around Earth origin (0,0,0)
 */
function slerpVector3(v1: THREE.Vector3, v2: THREE.Vector3, t: number): THREE.Vector3 {
  const d1 = v1.clone().normalize();
  const d2 = v2.clone().normalize();
  const dot = Math.max(-1, Math.min(1, d1.dot(d2)));
  if (dot > 0.9999) {
    return d1.clone().lerp(d2, t).normalize();
  }
  const theta = Math.acos(dot) * t;
  const relative = d2.clone().sub(d1.clone().multiplyScalar(dot)).normalize();
  return d1.clone().multiplyScalar(Math.cos(theta)).add(relative.multiplyScalar(Math.sin(theta))).normalize();
}

/**
 * Interpolates camera path along a spherical arc with parabolic altitude lift to prevent Earth clipping
 */
function interpolateCameraPath(
  camStart: THREE.Vector3,
  camEnd: THREE.Vector3,
  progress: number,
  minDist: number,
  arcBoost: number = 8.0
): THREE.Vector3 {
  const dir = slerpVector3(camStart, camEnd, progress);
  const startR = camStart.length();
  const endR = camEnd.length();
  const baseR = THREE.MathUtils.lerp(startR, endR, progress);
  const arcLift = Math.sin(progress * Math.PI) * arcBoost;
  const finalR = Math.max(minDist, baseR + arcLift);
  return dir.multiplyScalar(finalR);
}

/**
 * Interpolates look-at target vector
 */
function interpolateLookAt(
  startLook: THREE.Vector3,
  endLook: THREE.Vector3,
  progress: number,
  yOffset: number = 0
): THREE.Vector3 {
  const dir = slerpVector3(startLook, endLook, progress);
  const startR = startLook.length();
  const endR = endLook.length();
  const baseR = THREE.MathUtils.lerp(startR, endR, progress);
  const res = dir.multiplyScalar(baseR);
  res.y += yOffset;
  return res;
}

export class GlobeTerrainScene {
  public container: HTMLElement;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public controls: OrbitControls;
  public animationFrameId: number | null = null;
  public isDisposed: boolean = false;

  // Globe Objects
  public globeGroup: THREE.Group;
  public earthMesh: THREE.Mesh | null = null;
  public cloudsMesh: THREE.Mesh | null = null;
  public originMarkerGroup: THREE.Group;
  public destinationMarkerGroup: THREE.Group;
  public networkMarkersGroup: THREE.Group;
  public flightPathMesh: THREE.Mesh | null = null;
  public flightPathGuideMesh: THREE.Mesh | null = null;
  public flightCargoIndicator: THREE.Group | null = null;
  public textureLoader: THREE.TextureLoader;

  // Single Route Animation
  public flightPoints: THREE.Vector3[] = [];
  public currentDestination: GeoLocation = DESTINATIONS[0];
  public flightDrawProgress: number = 1.0; // 0.0 to 1.0
  public pulseProgress: number = 0.0;

  // Camera Animation Tween & Master Timeline
  private timeline: gsap.core.Timeline | null = null;
  private cameraTween: gsap.core.Tween | null = null;
  private flightTween: gsap.core.Tween | null = null;
  public isCameraAnimating: boolean = false;

  // Callbacks
  public callbacks: SceneCallbacks = {};

  constructor(container: HTMLElement, callbacks: SceneCallbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    this.scene = new THREE.Scene();

    // Scene is transparent so the light CSS background gradient of container shines through cleanly
    this.scene.background = null;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 4000);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // Transparent canvas for light theme background
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.7;
    this.renderer.domElement.style.touchAction = 'pan-y'; // Allows fluid vertical webpage scrolling on mobile phones
    this.container.appendChild(this.renderer.domElement);

    // Orbit Controls (Drag to rotate, zoom disabled to prevent scroll trapping)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = GLOBE_RADIUS + 12;
    this.controls.maxDistance = GLOBE_RADIUS * 4.0;
    this.controls.rotateSpeed = 0.7;
    this.controls.enableZoom = false; // Allows smooth webpage vertical scrolling
    this.controls.enablePan = false;

    this.textureLoader = new THREE.TextureLoader();
    this.globeGroup = new THREE.Group();
    this.originMarkerGroup = new THREE.Group();
    this.destinationMarkerGroup = new THREE.Group();
    this.networkMarkersGroup = new THREE.Group();

    this.globeGroup.add(this.networkMarkersGroup);
    this.globeGroup.add(this.originMarkerGroup);
    this.globeGroup.add(this.destinationMarkerGroup);
    this.scene.add(this.globeGroup);

    this.setupLighting();
    this.createPhotorealisticEarth();
    this.createAtmosphereClouds();
    this.createFarmEstateModel();
    this.createGlobalNetworkMarkers();
    this.setupResizeListener();

    // Initial camera position shows the majestic full globe view
    this.setInitialGlobeOverview();
    this.startRenderLoop();
  }

  /**
   * Natural, bright daylight studio lighting with camera headlight
   * Ensures the globe face is always brightly, evenly, and vividly illuminated
   */
  private setupLighting(): void {
    // Generous ambient light ensuring no dark shadow hemisphere anywhere on the globe
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    this.scene.add(ambientLight);

    // Natural hemisphere sky/ground light for crisp, fresh daylight tone
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 1.4);
    hemiLight.position.set(0, 200, 0);
    this.scene.add(hemiLight);

    // Main clean white sun key light
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(160, 130, 170);
    this.scene.add(sunLight);

    // Soft neutral fill light
    const fillLight = new THREE.DirectionalLight(0xf8fafc, 1.2);
    fillLight.position.set(-160, 40, -140);
    this.scene.add(fillLight);

    // Dedicated Camera Headlight:
    // Guarantees whatever country/region the camera points towards is in direct, bright sunlight
    this.scene.add(this.camera);
    const cameraLight = new THREE.DirectionalLight(0xffffff, 2.2);
    cameraLight.position.set(0, 0, 1);
    this.camera.add(cameraLight);
  }

  /**
   * Photorealistic Earth without dark crevices or shadows
   */
  private createPhotorealisticEarth(): void {
    const geometry = new THREE.SphereGeometry(GLOBE_RADIUS, 128, 128);

    const dayTexture = this.textureLoader.load('/textures/earth/earth_day.jpg');
    const normalTexture = this.textureLoader.load('/textures/earth/earth_normal.jpg');
    const specularTexture = this.textureLoader.load('/textures/earth/earth_specular.jpg');

    dayTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
      map: dayTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(0.2, 0.2),
      roughnessMap: specularTexture,
      roughness: 0.72,
      metalness: 0.0,
    });

    this.earthMesh = new THREE.Mesh(geometry, material);
    this.globeGroup.add(this.earthMesh);
  }

  /**
   * Delicate natural cloud layer
   */
  private createAtmosphereClouds(): void {
    const cloudGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.008, 96, 96);
    const cloudTexture = this.textureLoader.load('/textures/earth/earth_clouds.png');
    cloudTexture.colorSpace = THREE.SRGBColorSpace;

    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
    });

    this.cloudsMesh = new THREE.Mesh(cloudGeo, cloudMat);
    this.globeGroup.add(this.cloudsMesh);
  }

  /**
   * Denkanikottai Farm Estate Beacon at Origin (Bengaluru, India)
   * High-contrast Dark Green and Gold/White styling
   */
  private createFarmEstateModel(): void {
    this.originMarkerGroup.clear();

    const originPos = latLonToVector3(ORIGIN.latitude, ORIGIN.longitude, 0.1);
    const normal = originPos.clone().normalize();

    // 1. Concentric Radar Rings (Dark Green & Emerald)
    const ringGeo1 = new THREE.RingGeometry(0.8, 1.3, 32);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x1e3926, // Signature dark green
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.position.copy(originPos);
    ringMesh1.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    this.originMarkerGroup.add(ringMesh1);

    const ringGeo2 = new THREE.RingGeometry(1.7, 2.1, 32);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981, // Emerald pulse
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.position.copy(originPos);
    ringMesh2.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    this.originMarkerGroup.add(ringMesh2);

    // 2. High-Tech Greenhouse Cluster (20 Acres)
    const estateGroup = new THREE.Group();
    const polyGeo = new THREE.BoxGeometry(0.4, 0.25, 0.6);
    const polyMat = new THREE.MeshStandardMaterial({
      color: 0x1e3926,
      roughness: 0.3,
      metalness: 0.5,
    });

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const poly = new THREE.Mesh(polyGeo, polyMat);
        poly.position.set((r - 1) * 0.5, (c - 1) * 0.7, 0.15);
        estateGroup.add(poly);
      }
    }
    estateGroup.position.copy(originPos);
    estateGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    this.originMarkerGroup.add(estateGroup);

    // 3. Vertical Origin Beacon Column
    const beaconGeo = new THREE.CylinderGeometry(0.08, 0.3, 5.0, 16);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x1e3926,
      transparent: true,
      opacity: 0.95,
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.copy(originPos.clone().add(normal.clone().multiplyScalar(2.5)));
    beacon.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    this.originMarkerGroup.add(beacon);

    // 4. White & Gold Core Pin
    const coreGeo = new THREE.SphereGeometry(0.65, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.copy(originPos.clone().add(normal.clone().multiplyScalar(0.4)));
    this.originMarkerGroup.add(core);
  }

  /**
   * Destination Target 3D Model: Vertical Pointer Spire & High-Visibility Rings
   */
  public createDestinationModel(dest: GeoLocation): void {
    this.destinationMarkerGroup.clear();

    const destPos = latLonToVector3(dest.latitude, dest.longitude, 0.1);
    const normal = destPos.clone().normalize();

    // 1. Target Rings (Luminous Gold & Emerald for high contrast)
    const ringGeo = new THREE.RingGeometry(1.2, 1.9, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.copy(destPos);
    ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    this.destinationMarkerGroup.add(ringMesh);

    const outerRingGeo = new THREE.RingGeometry(2.3, 2.8, 32);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.position.copy(destPos);
    outerRingMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    this.destinationMarkerGroup.add(outerRingMesh);

    // 2. High-Tech Pointer Spire (Signature Dark Green with Gold/White Orb)
    const spireGeo = new THREE.ConeGeometry(0.5, 5.8, 16);
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0x1e3926,
      metalness: 0.4,
      roughness: 0.3,
    });
    const spire = new THREE.Mesh(spireGeo, spireMat);
    spire.position.copy(destPos.clone().add(normal.clone().multiplyScalar(2.9)));
    spire.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    this.destinationMarkerGroup.add(spire);

    // 3. Glowing Gold Orb on top of Spire
    const orbGeo = new THREE.SphereGeometry(0.7, 16, 16);
    const orbMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.copy(destPos.clone().add(normal.clone().multiplyScalar(5.8)));
    this.destinationMarkerGroup.add(orb);
  }

  /**
   * Illuminates all 21 destination markers across the globe with sharp contrast
   */
  public createGlobalNetworkMarkers(): void {
    this.networkMarkersGroup.clear();

    DESTINATIONS.forEach((dest) => {
      const isTarget = dest.id === this.currentDestination.id;
      const destPos = latLonToVector3(dest.latitude, dest.longitude, 0.1);
      const normal = destPos.clone().normalize();

      // Ripple ring
      const ringGeo = new THREE.RingGeometry(isTarget ? 1.4 : 0.6, isTarget ? 2.0 : 1.0, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: isTarget ? 0xf59e0b : 0x10b981,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isTarget ? 0.95 : 0.75,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(destPos);
      ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      this.networkMarkersGroup.add(ringMesh);

      // Pin Sphere
      const pinGeo = new THREE.SphereGeometry(isTarget ? 0.75 : 0.45, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: isTarget ? 0xf59e0b : 0x10b981,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(destPos.clone().add(normal.clone().multiplyScalar(0.25)));
      this.networkMarkersGroup.add(pinMesh);

      // Inner white core dot for crisp clarity on dark oceans and bright land
      const dotGeo = new THREE.SphereGeometry(isTarget ? 0.4 : 0.22, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(destPos.clone().add(normal.clone().multiplyScalar(0.45)));
      this.networkMarkersGroup.add(dotMesh);
    });
  }

  /**
   * Creates the 3D Great-Circle Flight Trajectory (High-visibility 3D Extruded Tube) and Moving Cargo Vessel
   */
  public createFlightPath(origin: GeoLocation, destination: GeoLocation): void {
    if (this.flightPathMesh) {
      this.globeGroup.remove(this.flightPathMesh);
      this.flightPathMesh.geometry.dispose();
      if (Array.isArray(this.flightPathMesh.material)) {
        this.flightPathMesh.material.forEach((m) => m.dispose());
      } else {
        this.flightPathMesh.material.dispose();
      }
      this.flightPathMesh = null;
    }

    if (this.flightPathGuideMesh) {
      this.globeGroup.remove(this.flightPathGuideMesh);
      this.flightPathGuideMesh.geometry.dispose();
      if (Array.isArray(this.flightPathGuideMesh.material)) {
        this.flightPathGuideMesh.material.forEach((m) => m.dispose());
      } else {
        this.flightPathGuideMesh.material.dispose();
      }
      this.flightPathGuideMesh = null;
    }

    if (this.flightCargoIndicator) {
      this.globeGroup.remove(this.flightCargoIndicator);
      this.flightCargoIndicator = null;
    }

    // 160 segments for silky smooth curvature high above atmosphere
    this.flightPoints = generateGreatCirclePoints(origin, destination, 160, 20);

    if (this.flightPoints.length >= 2) {
      // 1. Subtle semi-transparent guide arc showing complete planned path
      const fullCurve = new THREE.CatmullRomCurve3(this.flightPoints);
      const guideGeo = new THREE.TubeGeometry(fullCurve, 90, 0.22, 6, false);
      const guideMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.35,
      });
      this.flightPathGuideMesh = new THREE.Mesh(guideGeo, guideMat);
      this.globeGroup.add(this.flightPathGuideMesh);

      // 2. Active 3D Extruded Flight Path Tube in Luminous Warm Gold / Amber
      // This is a real 3D volumetric cylinder (radius 0.5) with emissive glow,
      // guaranteeing vivid, crisp visibility over blue oceans and green landmasses!
      const initialPoints = this.flightPoints.slice(0, 2);
      const initialCurve = new THREE.CatmullRomCurve3(initialPoints);
      const activeGeo = new THREE.TubeGeometry(initialCurve, 4, 0.5, 8, false);
      const activeMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.95,
        roughness: 0.2,
        metalness: 0.1,
      });
      this.flightPathMesh = new THREE.Mesh(activeGeo, activeMat);
      this.globeGroup.add(this.flightPathMesh);
    }

    // 3. High-Luminosity Cargo Vessel Pod (Radiant white core + pulsing gold halo)
    const cargoGroup = new THREE.Group();
    const coreGeo = new THREE.SphereGeometry(0.9, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const core = new THREE.Mesh(coreGeo, coreMat);
    cargoGroup.add(core);

    const glowGeo = new THREE.SphereGeometry(1.65, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.75,
    });
    cargoGroup.add(new THREE.Mesh(glowGeo, glowMat));

    this.flightCargoIndicator = cargoGroup;
    if (this.flightPoints.length > 0) {
      this.flightCargoIndicator.position.copy(this.flightPoints[0]);
    }
    this.globeGroup.add(this.flightCargoIndicator);
  }

  /**
   * Set initial panoramic full globe overview (Earth visible in space)
   */
  public setInitialGlobeOverview(): void {
    const isMobile = (this.container.clientWidth || window.innerWidth) < 768;
    const isSmallMobile = (this.container.clientWidth || window.innerWidth) < 480;
    // Position camera high above Indian ocean / Middle East showing full globe
    const originPos = latLonToVector3(ORIGIN.latitude + 6, ORIGIN.longitude - 12, 0);
    const normal = originPos.clone().normalize();
    const dist = GLOBE_RADIUS + (isSmallMobile ? 115 : (isMobile ? 100 : 85));
    this.camera.position.copy(normal.clone().multiplyScalar(dist));
    const target = new THREE.Vector3(0, isMobile ? -5 : 0, 0);
    this.controls.target.copy(target);
    this.camera.lookAt(target);
  }

  /**
   * Master Journey Sequence:
   * 1. Focus / Glide to Denkanikottai (Bengaluru, India 20-Acre Farm Estate)
   * 2. Brief Origin Pulse / Beacon Ignition
   * 3. Launch Great-Circle Trajectory Flight from Denkanikottai to Destination (UK, UAE, Netherlands, etc.)
   * 4. Arrive at Destination with full specs & callout
   */
  public animateJourneySequence(
    destination: GeoLocation,
    isInitialLoad: boolean = false,
    onComplete?: () => void
  ): void {
    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }
    if (this.cameraTween) {
      this.cameraTween.kill();
      this.cameraTween = null;
    }
    if (this.flightTween) {
      this.flightTween.kill();
      this.flightTween = null;
    }

    this.isCameraAnimating = true;
    this.controls.enabled = false;
    this.currentDestination = destination;

    // Reset 3D markers and flight path for the journey
    this.createDestinationModel(destination);
    this.createGlobalNetworkMarkers();
    this.createFlightPath(ORIGIN, destination);
    this.updateDrawnFlightPath(0.001);

    const isMobile = (this.container.clientWidth || window.innerWidth) < 768;
    const isSmallMobile = (this.container.clientWidth || window.innerWidth) < 480;

    const originPos = latLonToVector3(ORIGIN.latitude, ORIGIN.longitude, 0);
    const destPos = latLonToVector3(destination.latitude, destination.longitude, 0);

    // Origin focused camera positioning (Denkanikottai Floriculture Estate)
    const originDist = GLOBE_RADIUS + (isSmallMobile ? 48 : (isMobile ? 42 : 34));
    const originCamPos = originPos.clone().normalize().multiplyScalar(originDist);
    const originLookAt = originPos.clone();
    if (isMobile) {
      originLookAt.y -= isSmallMobile ? 4.5 : 3.0;
    }

    // Destination optimal camera framing
    const midDir = new THREE.Vector3().addVectors(originPos, destPos).normalize();
    const distAngle = originPos.clone().normalize().angleTo(destPos.clone().normalize());
    const baseOffset = isSmallMobile ? 54 : (isMobile ? 46 : 36);
    const maxZoom = isSmallMobile ? 130 : (isMobile ? 118 : 105);
    const destDist = GLOBE_RADIUS + Math.max(isMobile ? 52 : 42, Math.min(maxZoom, baseOffset + distAngle * (isMobile ? 44 : 38)));

    const destCamPos = midDir.clone().multiplyScalar(destDist);
    const destLookAt = destPos.clone().lerp(originPos, 0.3);
    if (isMobile) {
      destLookAt.y -= isSmallMobile ? 6.0 : 4.0;
    }

    const startCamPos = this.camera.position.clone();
    const startLookAt = this.controls.target.clone();

    // Master GSAP Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        this.isCameraAnimating = false;
        this.controls.enabled = true;
        this.controls.target.copy(destLookAt);
        this.timeline = null;
        this.updateDrawnFlightPath(1.0);
        if (this.callbacks.onPhaseChange) this.callbacks.onPhaseChange('arrived');
        if (onComplete) onComplete();
      },
    });
    this.timeline = tl;

    // STEP 1: Zoom In / Glide to Denkanikottai Origin Farm
    const originDuration = isInitialLoad ? 1.4 : 1.15;
    const p1Obj = { t: 0 };

    tl.to(p1Obj, {
      t: 1.0,
      duration: originDuration,
      ease: 'power2.inOut',
      onStart: () => {
        if (this.callbacks.onPhaseChange) this.callbacks.onPhaseChange('origin');
        this.updateDrawnFlightPath(0.001);
      },
      onUpdate: () => {
        const currentPos = interpolateCameraPath(
          startCamPos,
          originCamPos,
          p1Obj.t,
          GLOBE_RADIUS + 24,
          isInitialLoad ? 4.0 : 10.0
        );
        this.camera.position.copy(currentPos);
        const currentLook = interpolateLookAt(startLookAt, originLookAt, p1Obj.t);
        this.controls.target.copy(currentLook);
        this.camera.lookAt(currentLook);
        this.updateDrawnFlightPath(0.001);
      },
    });

    // STEP 2: Brief Origin Focus Pause (Highlighting Denkanikottai)
    tl.to({}, { duration: 0.25 });

    // STEP 3: Flight Trajectory Launch from Denkanikottai ➔ Destination
    const flightDuration = 2.1;
    const p2Obj = { t: 0, flight: 0 };

    tl.to(p2Obj, {
      t: 1.0,
      flight: 1.0,
      duration: flightDuration,
      ease: 'power2.out',
      onStart: () => {
        if (this.callbacks.onPhaseChange) this.callbacks.onPhaseChange('flying');
      },
      onUpdate: () => {
        const currentPos = interpolateCameraPath(
          originCamPos,
          destCamPos,
          p2Obj.t,
          GLOBE_RADIUS + 30,
          12.0
        );
        this.camera.position.copy(currentPos);
        const currentLook = interpolateLookAt(originLookAt, destLookAt, p2Obj.t);
        this.controls.target.copy(currentLook);
        this.camera.lookAt(currentLook);

        this.updateDrawnFlightPath(p2Obj.flight);
      },
    });
  }

  public animateToDestination(
    destination: GeoLocation,
    _durationSec: number = 2.0,
    onComplete?: () => void
  ): void {
    this.animateJourneySequence(destination, false, onComplete);
  }

  /**
   * Updates the visible portion of the 3D flight path tube based on progress t in [0, 1]
   */
  private updateDrawnFlightPath(progress: number): void {
    if (!this.flightPathMesh || this.flightPoints.length < 2) return;

    this.flightDrawProgress = Math.max(0.001, Math.min(1.0, progress));
    const pointCount = Math.max(
      2,
      Math.floor(this.flightDrawProgress * this.flightPoints.length)
    );
    const visiblePoints = this.flightPoints.slice(0, pointCount);

    if (visiblePoints.length >= 2) {
      const curve = new THREE.CatmullRomCurve3(visiblePoints);
      const tubularSegments = Math.max(8, Math.floor(visiblePoints.length * 0.75));
      const newGeo = new THREE.TubeGeometry(curve, tubularSegments, 0.5, 8, false);
      this.flightPathMesh.geometry.dispose();
      this.flightPathMesh.geometry = newGeo;
    }

    // Update cargo pod position at tip of path
    if (this.flightCargoIndicator) {
      const tipPoint = visiblePoints[visiblePoints.length - 1];
      this.flightCargoIndicator.position.copy(tipPoint);
    }
  }

  public setCameraToOrigin(): void {
    const isMobile = (this.container.clientWidth || window.innerWidth) < 768;
    const originPos = latLonToVector3(ORIGIN.latitude, ORIGIN.longitude, 0);
    const normal = originPos.clone().normalize();
    const dist = isMobile ? 70 : 58;
    this.camera.position.copy(originPos.clone().add(normal.clone().multiplyScalar(dist)));
    const target = originPos.clone();
    if (isMobile) {
      target.y -= 4.0;
    }
    this.controls.target.copy(target);
    this.camera.lookAt(target);
  }

  public setInitialCameraView(dest: GeoLocation): void {
    const isMobile = (this.container.clientWidth || window.innerWidth) < 768;
    const originPos = latLonToVector3(ORIGIN.latitude, ORIGIN.longitude, 0);
    const destPos = latLonToVector3(dest.latitude, dest.longitude, 0);
    const midPoint = new THREE.Vector3().addVectors(originPos, destPos).normalize();
    const cameraDist = GLOBE_RADIUS + (isMobile ? 68 : 56);

    this.camera.position.copy(midPoint.multiplyScalar(cameraDist));
    const target = destPos.clone().lerp(originPos, 0.35);
    if (isMobile) {
      target.y -= 4.0;
    }
    this.controls.target.copy(target);
    this.camera.lookAt(this.controls.target);
  }

  /**
   * Projects a geo-coordinate (lat, lon) to 2D CSS screen coordinates
   */
  public projectToScreen(
    lat: number,
    lon: number,
    altitude: number = 0.2
  ): { x: number; y: number; visible: boolean } {
    const pos = latLonToVector3(lat, lon, altitude);
    const normal = pos.clone().normalize();
    const camDir = this.camera.position.clone().normalize();
    const dot = normal.dot(camDir);

    const projected = pos.clone().project(this.camera);

    const w = this.container.clientWidth;
    const h = this.container.clientHeight;

    const x = (projected.x * 0.5 + 0.5) * w;
    const y = (-(projected.y * 0.5) + 0.5) * h;

    const isFacing = dot > 0.12;
    const isInFront = projected.z < 1.0;
    const isInBounds = x >= 10 && x <= w - 10 && y >= 10 && y <= h - 10;

    return {
      x,
      y,
      visible: isFacing && isInFront && isInBounds,
    };
  }

  private setupResizeListener(): void {
    const handleResize = () => {
      if (this.isDisposed || !this.container) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
  }

  private startRenderLoop(): void {
    const clock = new THREE.Clock();

    const animate = () => {
      if (this.isDisposed) return;
      this.animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Atmospheric cloud rotational drift
      if (this.cloudsMesh) {
        this.cloudsMesh.rotation.y += delta * 0.01;
      }

      // Continuous flowing pulse along flight path when dwelling
      if (!this.isCameraAnimating && this.flightCargoIndicator && this.flightPoints.length > 0) {
        this.pulseProgress = (this.pulseProgress + delta * 0.35) % 1.0;
        const index = Math.min(
          this.flightPoints.length - 1,
          Math.floor(this.pulseProgress * (this.flightPoints.length - 1))
        );
        this.flightCargoIndicator.position.copy(this.flightPoints[index]);
      }

      if (this.controls.enabled) {
        this.controls.update();
      }

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  public dispose(): void {
    this.isDisposed = true;
    if (this.timeline) this.timeline.kill();
    if (this.cameraTween) this.cameraTween.kill();
    if (this.flightTween) this.flightTween.kill();
    if (this.animationFrameId !== null) cancelAnimationFrame(this.animationFrameId);
    if (this.controls) this.controls.dispose();
    if (this.flightPathMesh) {
      this.flightPathMesh.geometry.dispose();
      this.flightPathMesh = null;
    }
    if (this.flightPathGuideMesh) {
      this.flightPathGuideMesh.geometry.dispose();
      this.flightPathGuideMesh = null;
    }
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
  }
}
