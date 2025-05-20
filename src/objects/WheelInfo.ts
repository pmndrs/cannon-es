import { Vec3 } from '../math/Vec3'
import { Transform } from '../math/Transform'
import { RaycastResult } from '../collision/RaycastResult'
import { Utils } from '../utils/Utils'
import type { Body } from '../objects/Body'

export type WheelInfoOptions = ConstructorParameters<typeof WheelInfo>[0]

export type WheelRaycastResult = RaycastResult &
  Partial<{
    suspensionLength: number
    directionWorld: Vec3
    groundObject: number
  }>

/**
 * WheelInfo
 */
export class WheelInfo {
  /**
   * Max travel distance of the suspension, in meters.
   * @default 1
   */
  maxSuspensionTravel: number
  /**
   * Speed to apply to the wheel rotation when the wheel is sliding.
   * @default -0.1
   */
  customSlidingRotationalSpeed: number
  /**
   * If the customSlidingRotationalSpeed should be used.
   * @default false
   */
  useCustomSlidingRotationalSpeed: boolean
  /**
   * sliding
   */
  sliding: boolean
  /**
   * Connection point, defined locally in the chassis body frame.
   */
  chassisConnectionPointLocal: Vec3
  /**
   * chassisConnectionPointWorld
   */
  chassisConnectionPointWorld: Vec3
  /**
   * directionLocal
   */
  directionLocal: Vec3
  /**
   * directionWorld
   */
  directionWorld: Vec3
  /**
   * axleLocal
   */
  axleLocal: Vec3
  /**
   * axleWorld
   */
  axleWorld: Vec3
  /**
   * suspensionRestLength
   * @default 1
   */
  suspensionRestLength: number
  /**
   * suspensionMaxLength
   * @default 2
   */
  suspensionMaxLength: number
  /**
   * radius
   * @default 1
   */
  radius: number
  /**
   * suspensionStiffness
   * @default 100
   */
  suspensionStiffness: number
  /**
   * dampingCompression
   * @default 10
   */
  dampingCompression: number
  /**
   * dampingRelaxation
   * @default 10
   */
  dampingRelaxation: number
  /**
   * frictionSlip
   * @default 10.5
   */
  frictionSlip: number
  /** forwardAcceleration */
  forwardAcceleration: number
  /** sideAcceleration */
  sideAcceleration: number
  /**
   * steering
   * @default 0
   */
  steering: number
  /**
   * Rotation value, in radians.
   * @default 0
   */
  rotation: number
  /**
   * deltaRotation
   * @default 0
   */
  deltaRotation: number
  /**
   * rollInfluence
   * @default 0.01
   */
  rollInfluence: number
  /**
   * maxSuspensionForce
   */
  maxSuspensionForce: number
  /**
   * engineForce
   */
  engineForce: number
  /**
   * brake
   */
  brake: number
  /**
   * antiLockBraking
   * @default false
   */
  antiLockBraking: boolean
  /**
   * isFrontWheel
   * @default true
   */
  isFrontWheel: boolean
  /**
   * clippedInvContactDotSuspension
   * @default 1
   */
  clippedInvContactDotSuspension: number
  /**
   * suspensionRelativeVelocity
   * @default 0
   */
  suspensionRelativeVelocity: number
  /**
   * suspensionForce
   * @default 0
   */
  suspensionForce: number
  /**
   * slipInfo
   */
  slipInfo: number
  /**
   * skidInfo
   * @default 0
   */
  skidInfo: number
  /**
   * suspensionLength
   * @default 0
   */
  suspensionLength: number
  /**
   * sideImpulse
   */
  sideImpulse: number
  /**
   * forwardImpulse
   */
  forwardImpulse: number
  /**
   * The result from raycasting.
   */
  raycastResult: WheelRaycastResult
  /**
   * Wheel world transform.
   */
  worldTransform: Transform
  /**
   * isInContact
   */
  isInContact: boolean

  constructor(
    options: {
      /**
       * Connection point, defined locally in the chassis body frame.
       */
      chassisConnectionPointLocal?: Vec3
      /**
       * chassisConnectionPointWorld
       */
      chassisConnectionPointWorld?: Vec3
      /**
       * directionLocal
       */
      directionLocal?: Vec3
      /**
       * directionWorld
       */
      directionWorld?: Vec3
      /**
       * axleLocal
       */
      axleLocal?: Vec3
      /**
       * axleWorld
       */
      axleWorld?: Vec3
      /**
       * suspensionRestLength
       * @default 1
       */
      suspensionRestLength?: number
      /**
       * suspensionMaxLength
       * @default 2
       */
      suspensionMaxLength?: number
      /**
       * radius
       * @default 1
       */
      radius?: number
      /**
       * suspensionStiffness
       * @default 100
       */
      suspensionStiffness?: number
      /**
       * dampingCompression
       * @default 10
       */
      dampingCompression?: number
      /**
       * dampingRelaxation
       * @default 10
       */
      dampingRelaxation?: number
      /**
       * frictionSlip
       * @default 10.5
       */
      frictionSlip?: number
      /** forwardAcceleration */
      forwardAcceleration?: number
      /** sideAcceleration */
      sideAcceleration?: number
      /**
       * steering
       * @default 0
       */
      steering?: number
      /**
       * Rotation value, in radians.
       * @default 0
       */
      rotation?: number
      /**
       * deltaRotation
       * @default 0
       */
      deltaRotation?: number
      /**
       * rollInfluence
       * @default 0.01
       */
      rollInfluence?: number
      /**
       * maxSuspensionForce
       */
      maxSuspensionForce?: number
      /**
       * isFrontWheel
       * @default true
       */
      isFrontWheel?: boolean
      /**
       * clippedInvContactDotSuspension
       * @default 1
       */
      clippedInvContactDotSuspension?: number
      /**
       * suspensionRelativeVelocity
       * @default 0
       */
      suspensionRelativeVelocity?: number
      /**
       * suspensionForce
       * @default 0
       */
      suspensionForce?: number
      /**
       * slipInfo
       */
      slipInfo?: number
      /**
       * skidInfo
       * @default 0
       */
      skidInfo?: number
      /**
       * suspensionLength
       * @default 0
       */
      suspensionLength?: number
      /**
       * Max travel distance of the suspension, in meters.
       * @default 1
       */
      maxSuspensionTravel?: number
      /**
       * If the wheel should rotate when braking. (ABS)
       * @default false
       */
      antiLockBraking?: boolean
      /**
       * If the customSlidingRotationalSpeed should be used.
       * @default false
       */
      useCustomSlidingRotationalSpeed?: boolean
      /**
       * Speed to apply to the wheel rotation when the wheel is sliding.
       * @default -0.1
       */
      customSlidingRotationalSpeed?: number
    } = {}
  ) {
    options = Utils.defaults(options, {
      chassisConnectionPointLocal: new Vec3(),
      chassisConnectionPointWorld: new Vec3(),
      directionLocal: new Vec3(),
      directionWorld: new Vec3(),
      axleLocal: new Vec3(),
      axleWorld: new Vec3(),
      suspensionRestLength: 1,
      suspensionMaxLength: 2,
      radius: 1,
      suspensionStiffness: 100,
      dampingCompression: 10,
      dampingRelaxation: 10,
      frictionSlip: 10.5,
      forwardAcceleration: 1,
      sideAcceleration: 1,
      steering: 0,
      rotation: 0,
      deltaRotation: 0,
      rollInfluence: 0.01,
      maxSuspensionForce: Number.MAX_VALUE,
      isFrontWheel: true,
      clippedInvContactDotSuspension: 1,
      suspensionRelativeVelocity: 0,
      suspensionForce: 0,
      slipInfo: 0,
      skidInfo: 0,
      suspensionLength: 0,
      maxSuspensionTravel: 1,
      antiLockBraking: false,
      useCustomSlidingRotationalSpeed: false,
      customSlidingRotationalSpeed: -0.1,
    })

    this.maxSuspensionTravel = options.maxSuspensionTravel!
    this.customSlidingRotationalSpeed = options.customSlidingRotationalSpeed!
    this.useCustomSlidingRotationalSpeed = options.useCustomSlidingRotationalSpeed!
    this.sliding = false
    this.chassisConnectionPointLocal = options.chassisConnectionPointLocal!.clone()
    this.chassisConnectionPointWorld = options.chassisConnectionPointWorld!.clone()
    this.directionLocal = options.directionLocal!.clone()
    this.directionWorld = options.directionWorld!.clone()
    this.axleLocal = options.axleLocal!.clone()
    this.axleWorld = options.axleWorld!.clone()
    this.suspensionRestLength = options.suspensionRestLength!
    this.suspensionMaxLength = options.suspensionMaxLength!
    this.radius = options.radius!
    this.suspensionStiffness = options.suspensionStiffness!
    this.dampingCompression = options.dampingCompression!
    this.dampingRelaxation = options.dampingRelaxation!
    this.frictionSlip = options.frictionSlip!
    this.forwardAcceleration = options.forwardAcceleration!
    this.sideAcceleration = options.sideAcceleration!
    this.steering = 0
    this.rotation = 0
    this.deltaRotation = 0
    this.rollInfluence = options.rollInfluence!
    this.maxSuspensionForce = options.maxSuspensionForce!
    this.engineForce = 0
    this.brake = 0
    this.antiLockBraking = options.antiLockBraking!
    this.isFrontWheel = options.isFrontWheel!
    this.clippedInvContactDotSuspension = 1
    this.suspensionRelativeVelocity = 0
    this.suspensionForce = 0
    this.slipInfo = 0
    this.skidInfo = 0
    this.suspensionLength = 0
    this.sideImpulse = 0
    this.forwardImpulse = 0
    this.raycastResult = new RaycastResult()
    this.worldTransform = new Transform()
    this.isInContact = false
  }

  updateWheel(chassis: Body): void {
    const raycastResult = this.raycastResult

    if (this.isInContact) {
      const project = raycastResult.hitNormalWorld.dot(raycastResult.directionWorld!)
      raycastResult.hitPointWorld.vsub(chassis.position, relpos)
      chassis.getVelocityAtWorldPoint(relpos, chassis_velocity_at_contactPoint)
      const projVel = raycastResult.hitNormalWorld.dot(chassis_velocity_at_contactPoint)
      if (project >= -0.1) {
        this.suspensionRelativeVelocity = 0.0
        this.clippedInvContactDotSuspension = 1.0 / 0.1
      } else {
        const inv = -1 / project
        this.suspensionRelativeVelocity = projVel * inv
        this.clippedInvContactDotSuspension = inv
      }
    } else {
      // Not in contact : position wheel in a nice (rest length) position
      raycastResult.suspensionLength = this.suspensionRestLength
      this.suspensionRelativeVelocity = 0.0
      raycastResult.directionWorld!.scale(-1, raycastResult.hitNormalWorld)
      this.clippedInvContactDotSuspension = 1.0
    }
  }
}

const chassis_velocity_at_contactPoint = new Vec3()
const relpos = new Vec3()
