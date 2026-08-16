import { Ray } from './Ray'
import { RaycastResult } from './RaycastResult'
import { Vec3 } from '../math/Vec3'
import { Quaternion } from '../math/Quaternion'
import { Box } from '../shapes/Box'
import { Sphere } from '../shapes/Sphere'
import { Plane } from '../shapes/Plane'
import { Trimesh } from '../shapes/Trimesh'
import { Heightfield } from '../shapes/Heightfield'
import { Body } from '../objects/Body'

function createPolyhedron(size = 0.5) {
  const box = new Box(new Vec3(size, size, size))
  return box.convexPolyhedronRepresentation
}

describe('Ray', () => {
  test('construct', () => {
    const r = new Ray(new Vec3(), new Vec3(1, 0, 0))
    expect(r).toBeDefined()
  })

  test('intersectBody with convex', () => {
    const r = new Ray(new Vec3(5, 0, 0), new Vec3(-5, 0, 0))
    r.skipBackfaces = true
    const shape = createPolyhedron(0.5)
    const body = new Body({ mass: 1 })
    body.addShape(shape)

    const result = new RaycastResult()
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBe(true)

    result.reset()
    body.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), Math.PI)
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBe(true)

    result.reset()
    r.to.set(0, 0, -5)
    r.from.set(0, 0, 5)
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(0, 0, 0.5))).toBe(true)

    result.reset()
    const r2 = new Ray(new Vec3(5, 1, 0), new Vec3(-5, 1, 0))
    r2.intersectBody(body, result)
    expect(result.hasHit).toBe(false)
  })

  test('intersectBodies', () => {
    const r = new Ray(new Vec3(5, 0, 0), new Vec3(-5, 0, 0))
    r.skipBackfaces = true
    const shape = createPolyhedron(0.5)
    const body1 = new Body({ mass: 1 })
    body1.addShape(shape)
    const body2 = new Body({ mass: 1 })
    body2.addShape(shape)
    body2.position.x = -2

    const result = new RaycastResult()
    r.intersectBodies([body1, body2], result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBe(true)
  })

  test('box', () => {
    const r = new Ray(new Vec3(5, 0, 0), new Vec3(-5, 0, 0))
    r.skipBackfaces = true
    const shape = new Box(new Vec3(0.5, 0.5, 0.5))
    const body = new Body({ mass: 1 })
    body.addShape(shape)
    const result = new RaycastResult()

    r.intersectBody(body, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBe(true)

    result.reset()
    body.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), Math.PI / 2)
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBe(true)

    result.reset()
    body.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), Math.PI)
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBe(true)

    result.reset()
    body.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), (3 * Math.PI) / 2)
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(0.5, 0, 0))).toBe(true)
  })

  test('sphere', () => {
    const r = new Ray(new Vec3(5, 0, 0), new Vec3(-5, 0, 0))
    r.skipBackfaces = true
    const shape = new Sphere(1)
    const body = new Body({ mass: 1 })
    body.addShape(shape)

    const result = new RaycastResult()
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(1, 0, 0))).toBe(true)

    result.reset()
    body.position.set(1, 0, 0)
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(2, 0, 0))).toBe(true)

    result.reset()
    const shape2 = new Sphere(1)
    const body2 = new Body({ mass: 1 })
    body2.addShape(shape2, new Vec3(1, 0, 0))
    r.intersectBody(body2, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(2, 0, 0))).toBe(true)
  })

  test('plane', () => {
    const r = new Ray(new Vec3(0, 0, 5), new Vec3(0, 0, -5))
    r.skipBackfaces = true
    const shape = new Plane()
    const body = new Body({ mass: 1 })
    body.addShape(shape)

    const result = new RaycastResult()
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(0, 0, 0))).toBe(true)
    expect(result.distance).toBe(5)

    result.reset()
    const body2 = new Body({ mass: 1 })
    body2.addShape(shape, new Vec3(0, 0, 1), new Quaternion())
    r.intersectBody(body2, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld.almostEquals(new Vec3(0, 0, 1))).toBe(true)

    result.reset()
    const body3 = new Body({ mass: 1 })
    const quat = new Quaternion()
    quat.setFromAxisAngle(new Vec3(1, 0, 0), Math.PI / 2)
    body3.addShape(shape, new Vec3(), quat)
    r.intersectBody(body3, result)
    expect(result.hasHit).toBe(false)

    result.reset()
    const body4 = new Body({ mass: 1 })
    body4.addShape(shape)
    const r2 = new Ray(new Vec3(1, 1, 5), new Vec3(1, 1, -5))
    r2.intersectBody(body4, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld).toEqual(new Vec3(1, 1, 0))
    expect(result.distance).toBe(5)
  })

  test('trimesh', () => {
    const r = new Ray(new Vec3(0.5, 0.5, 10), new Vec3(0.5, 0.5, -10))
    r.skipBackfaces = true

    const vertices = [0, 0, 0, 1, 0, 0, 0, 1, 0]
    const indices = [0, 1, 2]

    const body = new Body({
      mass: 1,
      shape: new Trimesh(vertices, indices),
    })

    const result = new RaycastResult()
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld).toEqual(new Vec3(0.5, 0.5, 0))

    result.reset()
    r.from.set(-100, -100, 10)
    r.to.set(-100, -100, -10)
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(false)
  })

  test('heightfield', () => {
    const r = new Ray(new Vec3(0, 0, 10), new Vec3(0, 0, -10))
    r.skipBackfaces = true
    const data = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]
    const shape = new Heightfield(data, { elementSize: 1 })
    const body = new Body({ mass: 1 })
    body.addShape(shape)
    body.position.set(-1, -1, 0)

    const result = new RaycastResult()
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(true)
    expect(result.hitPointWorld).toEqual(new Vec3(0, 0, 1))

    result.reset()
    r.from.set(-100, -100, 10)
    r.to.set(-100, -100, -10)
    r.intersectBody(body, result)
    expect(result.hasHit).toBe(false)

    for (let i = 0; i < data.length - 1; i++) {
      for (let j = 0; j < data[i].length - 1; j++) {
        for (let k = 0; k < 2; k++) {
          result.reset()
          // Body is offset by (-1,-1,0), so world coords for the grid start at (-1,-1)
          r.from.set(i - 1 + 0.25, j - 1 + 0.25, 10)
          r.to.set(i - 1 + 0.25, j - 1 + 0.25, -10)
          if (k) {
            r.from.x += 0.5
            r.from.y += 0.5
            r.to.x += 0.5
            r.to.y += 0.5
          }
          r.intersectBody(body, result)
          expect(result.hasHit).toBe(true)
        }
      }
    }
  })
})
