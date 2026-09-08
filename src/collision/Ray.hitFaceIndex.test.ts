import { Ray } from './Ray'
import { RaycastResult } from './RaycastResult'
import { Box } from '../shapes/Box'
import { Body } from '../objects/Body'
import { Vec3 } from '../math/Vec3'

/**
 * Regression test for the `hitFaceIndex` reported by a CLOSEST-mode raycast.
 *
 * When a ray passes straight through a convex shape it intersects two faces:
 * the near (entry) face and the far (exit) face. In `Ray.CLOSEST` mode the
 * position / normal / distance stored in the result must describe the closest
 * (entry) hit, and `hitFaceIndex` must describe that same face.
 *
 * The bug: `reportIntersection` assigned `result.hitFaceIndex` unconditionally
 * for every reported intersection, while the rest of the hit data was only
 * stored when the new hit was actually closer. As a result `hitFaceIndex`
 * ended up describing the LAST reported face (the far/exit face) instead of
 * the closest one that the other fields describe.
 */
describe('Ray.hitFaceIndex', () => {
  test('reports the face index of the closest hit, not the last reported face', () => {
    // Box faces order (see Box.updateConvexPolyhedronRepresentation):
    //   0: -z, 1: +z, 2: -y, 3: +y, 4: -x, 5: +x
    const box = new Box(new Vec3(1, 1, 1))
    const body = new Body({ mass: 1 })
    body.addShape(box)
    body.position.set(0, 0, 0)
    body.updateBoundingRadius()

    // Ray travels along +z, so it enters through the -z face (index 0, z = -1)
    // and exits through the +z face (index 1, z = +1).
    const from = new Vec3(0, 0, -5)
    const to = new Vec3(0, 0, 5)

    const ray = new Ray(from, to)
    ray.mode = Ray.CLOSEST

    const result = new RaycastResult()
    ray.intersectBody(body, result)

    expect(result.hasHit).toBe(true)

    // The stored hit data describes the closest (entry) face at z = -1.
    expect(result.hitPointWorld.z).toBeCloseTo(-1, 6)
    expect(result.hitNormalWorld.z).toBeCloseTo(-1, 6)
    expect(result.distance).toBeCloseTo(4, 6)

    // hitFaceIndex must describe that SAME closest face (the -z face, index 0),
    // not the far exit face (+z face, index 1) that was reported afterwards.
    expect(result.hitFaceIndex).toBe(0)
  })
})

describe('Ray.hitFaceIndex in ALL and ANY modes', () => {
  test('ALL reports each face index alongside its hit point', () => {
    const body = new Body({ shape: new Box(new Vec3(1, 1, 1)) })
    const ray = new Ray(new Vec3(0, 0, -5), new Vec3(0, 0, 5))
    ray.from.x = 0.25
    ray.to.x = 0.25
    ray.mode = Ray.ALL
    const hits: { index: number; z: number }[] = []
    ray.callback = (result) => {
      hits.push({ index: result.hitFaceIndex, z: result.hitPointWorld.z })
    }

    ray.intersectBody(body, new RaycastResult())

    expect(hits).toEqual([
      { index: 0, z: -1 },
      { index: 1, z: 1 },
    ])
  })

  test('ANY retains the first accepted face index', () => {
    const body = new Body({ shape: new Box(new Vec3(1, 1, 1)) })
    const ray = new Ray(new Vec3(0, 0, -5), new Vec3(0, 0, 5))
    ray.mode = Ray.ANY
    const result = new RaycastResult()

    ray.intersectBody(body, result)

    expect(result.hasHit).toBe(true)
    expect(result.shouldStop).toBe(true)
    expect(result.hitFaceIndex).toBe(0)
    expect(result.hitPointWorld.z).toBeCloseTo(-1)
  })
})
