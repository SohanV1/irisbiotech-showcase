import * as THREE from 'three';
import gsap from 'gsap';
import { GeoLocation, ORIGIN } from './destinations';
import { GlobeTerrainScene } from './GlobeTerrainScene';
import {
  sampleFlightTrajectory,
  sampleGlobalNetworkTrajectory,
  FlightCameraState,
} from './geospatial';

export interface FlightEngineCallbacks {
  onUpdate?: (state: FlightCameraState) => void;
  onComplete?: () => void;
  onStart?: () => void;
}

export class CameraFlightEngine {
  private scene: GlobeTerrainScene;
  private currentTween: gsap.core.Tween | null = null;
  public isFlying: boolean = false;
  public isPaused: boolean = false;
  public progress: number = 0; // 0.0 to 1.0
  public duration: number = 20; // 20 seconds for rich cinematic feel
  public playbackSpeed: number = 1.0;
  public flightMode: 'simultaneous' | 'single' = 'simultaneous';

  private origin: GeoLocation = ORIGIN;
  private destination: GeoLocation;
  private callbacks: FlightEngineCallbacks;

  constructor(
    scene: GlobeTerrainScene,
    destination: GeoLocation,
    callbacks: FlightEngineCallbacks = {},
    mode: 'simultaneous' | 'single' = 'simultaneous'
  ) {
    this.scene = scene;
    this.destination = destination;
    this.callbacks = callbacks;
    this.flightMode = mode;
  }

  public setFlightMode(mode: 'simultaneous' | 'single'): void {
    this.flightMode = mode;
    this.scene.isSimultaneousMode = mode === 'simultaneous';
    this.resetToOrigin();
  }

  public setDestination(dest: GeoLocation): void {
    this.destination = dest;
    this.scene.setDestination(dest);
    this.resetToOrigin();
  }

  public setSpeed(speed: number): void {
    this.playbackSpeed = speed;
    if (this.currentTween) {
      this.currentTween.timeScale(speed);
    }
  }

  /**
   * Executes the cinematic flight from Origin Farm
   */
  public startFlight(): void {
    if (this.currentTween) {
      this.currentTween.kill();
    }

    this.isFlying = true;
    this.isPaused = false;
    this.progress = 0;

    if (this.callbacks.onStart) {
      this.callbacks.onStart();
    }

    const flightObject = { t: 0 };
    const totalDuration = this.duration / this.playbackSpeed;

    this.currentTween = gsap.to(flightObject, {
      t: 1.0,
      duration: totalDuration,
      ease: 'power2.inOut',
      onUpdate: () => {
        this.progress = flightObject.t;
        this.applyFlightProgress(this.progress);
      },
      onComplete: () => {
        this.isFlying = false;
        this.progress = 1.0;
        this.applyFlightProgress(1.0);
        if (this.callbacks.onComplete) {
          this.callbacks.onComplete();
        }
      },
    });
  }

  public pauseFlight(): void {
    if (this.currentTween && this.isFlying) {
      this.currentTween.pause();
      this.isPaused = true;
    }
  }

  public resumeFlight(): void {
    if (this.currentTween && this.isPaused) {
      this.currentTween.resume();
      this.isPaused = false;
    }
  }

  public replayFlight(): void {
    this.resetToOrigin();
    setTimeout(() => {
      this.startFlight();
    }, 400);
  }

  public resetToOrigin(): void {
    if (this.currentTween) {
      this.currentTween.kill();
      this.currentTween = null;
    }
    this.isFlying = false;
    this.isPaused = false;
    this.progress = 0;
    this.applyFlightProgress(0);
  }

  /**
   * Updates camera position, lookAt target, altitude, and cargo marker(s) at progress t
   */
  public applyFlightProgress(t: number): void {
    let flightState: FlightCameraState;

    if (this.flightMode === 'simultaneous') {
      flightState = sampleGlobalNetworkTrajectory(this.origin, t);

      // Update 3D camera
      this.scene.camera.position.copy(flightState.cameraPosition);
      this.scene.camera.lookAt(flightState.lookAtTarget);

      // Update all 21 simultaneous cargo pods
      this.scene.updateAllCargoPositions(t);
    } else {
      flightState = sampleFlightTrajectory(this.origin, this.destination, t);

      // Update 3D camera
      this.scene.camera.position.copy(flightState.cameraPosition);
      this.scene.camera.lookAt(flightState.lookAtTarget);

      // Update single moving cargo indicator
      this.scene.updateCargoPosition(t);
    }

    // Trigger state callback for React UI HUD
    if (this.callbacks.onUpdate) {
      this.callbacks.onUpdate(flightState);
    }
  }

  public dispose(): void {
    if (this.currentTween) {
      this.currentTween.kill();
    }
  }
}

