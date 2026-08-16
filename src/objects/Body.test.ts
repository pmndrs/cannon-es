import { Body } from './Body'
import { Box } from '../shapes/Box'
import { Sphere } from '../shapes/Sphere'
import { Vec3 } from '../math/Vec3'
import { Quaternion } from '../math/Quaternion'

describe('Body', () => {
  describe('computeAABB', () => {
    test('box', () => {
      const body = new Body({ mass: 1 })
      body.addShape(new Box(new Vec3(1, 1, 1)))
      body.updateAABB()
      expect(body.aabb.lowerBound.x).toBe(-1)
      expect(body.aabb.lowerBound.y).toBe(-1)
      expect(body.aabb.lowerBound.z).toBe(-1)
      expect(body.aabb.upperBound.x).toBe(1)
      expect(body.aabb.upperBound.y).toBe(1)
      expect(body.aabb.upperBound.z).toBe(1)

      body.position.x = 1
      body.updateAABB()
      expect(body.aabb.lowerBound.x).toBe(0)
      expect(body.aabb.upperBound.x).toBe(2)
    })

    test('box with offset', () => {
      const body = new Body({ mass: 1 })
      body.addShape(new Box(new Vec3(1, 1, 1)), new Vec3(1, 1, 1))
      body.updateAABB()
      expect(body.aabb.lowerBound.x).toBe(0)
      expect(body.aabb.lowerBound.y).toBe(0)
      expect(body.aabb.lowerBound.z).toBe(0)
      expect(body.aabb.upperBound.x).toBe(2)
      expect(body.aabb.upperBound.y).toBe(2)
      expect(body.aabb.upperBound.z).toBe(2)

      body.position.x = 1
      body.updateAABB()
      expect(body.aabb.lowerBound.x).toBe(1)
      expect(body.aabb.upperBound.x).toBe(3)
    })
  })

  test('updateInertiaWorld', () => {
    const body = new Body({ mass: 1 })
    body.addShape(new Box(new Vec3(1, 1, 1)))
    body.quaternion.setFromEuler(Math.PI / 2, 0, 0)
    body.updateInertiaWorld()
  })

  test('pointToLocalFrame', () => {
    const body = new Body({ mass: 1 })
    body.addShape(new Sphere(1))
    body.position.set(1, 2, 2)
    const localPoint = body.pointToLocalFrame(new Vec3(1, 2, 3))
    expect(localPoint.almostEquals(new Vec3(0, 0, 1))).toBe(true)
  })

  test('pointToWorldFrame', () => {
    const body = new Body({ mass: 1 })
    body.addShape(new Sphere(1))
    body.position.set(1, 2, 2)
    const worldPoint = body.pointToWorldFrame(new Vec3(1, 0, 0))
    expect(worldPoint.almostEquals(new Vec3(2, 2, 2))).toBe(true)
  })

  test('addShape', () => {
    const sphereShape = new Sphere(1)

    const bodyA = new Body({
      mass: 1,
      shape: sphereShape,
    })
    const bodyB = new Body({ mass: 1 })
    bodyB.addShape(sphereShape)

    expect(bodyA.shapes).toEqual(bodyB.shapes)
    expect(bodyA.inertia).toEqual(bodyB.inertia)
  })

  test('applyForce', () => {
    const body = new Body({
      mass: 1,
      shape: new Sphere(1),
    })

    const worldPoint = new Vec3(1, 0, 0)
    const forceVector = new Vec3(0, 1, 0)
    body.applyForce(forceVector, worldPoint)
    expect(body.force).toEqual(forceVector)
    expect(body.torque).toEqual(new Vec3(0, 0, 1))
  })

  test('applyLocalForce', () => {
    const body = new Body({
      mass: 1,
      shape: new Sphere(1),
    })
    body.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), Math.PI / 2)

    const localPoint = new Vec3(1, 0, 0)
    const localForceVector = new Vec3(0, 1, 0)
    body.applyLocalForce(localForceVector, localPoint)
    expect(body.force.almostEquals(new Vec3(0, 0, 1))).toBe(true)
  })

  test('applyImpulse', () => {
    const body = new Body({
      mass: 1,
      shape: new Sphere(1),
    })

    const f = 1000
    const dt = 1 / 60
    const worldPoint = new Vec3(0, 0, 0)
    const impulse = new Vec3(f * dt, 0, 0)
    body.applyImpulse(impulse, worldPoint)

    expect(body.velocity.almostEquals(new Vec3(f * dt, 0, 0))).toBe(true)
  })

  test('applyLocalImpulse', () => {
    const body = new Body({
      mass: 1,
      shape: new Sphere(1),
    })
    body.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), Math.PI / 2)

    const f = 1000
    const dt = 1 / 60
    const localPoint = new Vec3(1, 0, 0)
    const localImpulseVector = new Vec3(0, f * dt, 0)
    body.applyLocalImpulse(localImpulseVector, localPoint)
    expect(body.velocity.almostEquals(new Vec3(0, 0, f * dt))).toBe(true)
  })
})
