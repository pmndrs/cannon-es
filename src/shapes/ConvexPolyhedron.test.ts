import { ConvexPolyhedron } from './ConvexPolyhedron'
import { Box } from './Box'
import { Vec3 } from '../math/Vec3'
import { Quaternion } from '../math/Quaternion'

function createBoxHull(size = 0.5) {
  const box = new Box(new Vec3(size, size, size))
  return box.convexPolyhedronRepresentation
}

function createPolyBox(sx: number, sy: number, sz: number) {
  const box = new Box(new Vec3(sx, sy, sz))
  return box.convexPolyhedronRepresentation
}

describe('ConvexPolyhedron', () => {
  test('calculateWorldAABB', () => {
    const poly = createPolyBox(1, 1, 1)
    const min = new Vec3()
    const max = new Vec3()
    poly.calculateWorldAABB(new Vec3(1, 0, 0), new Quaternion(0, 0, 0, 1), min, max)
    expect(min.x).toBe(0)
    expect(max.x).toBe(2)
    expect(min.y).toBe(-1)
    expect(max.y).toBe(1)
  })

  test('clipFaceAgainstPlane', () => {
    const h = createBoxHull()

    const inverts = [new Vec3(-0.2, -0.2, -1), new Vec3(-0.2, 0.2, -1), new Vec3(0.2, 0.2, -1), new Vec3(0.2, -0.2, -1)]
    const outverts: Vec3[] = []
    h.clipFaceAgainstPlane(inverts, outverts, new Vec3(0, 0, 1), 0.0)
    expect(outverts.length).toBe(4)

    const inverts2: Vec3[] = []
    const outverts2: Vec3[] = []
    h.clipFaceAgainstPlane(inverts2, outverts2, new Vec3(0, 0, 1), 2)
    expect(outverts2.length).toBe(0)

    const inverts3 = [new Vec3(-2, -2, 1), new Vec3(-2, 2, 1), new Vec3(2, 2, -1), new Vec3(2, -2, -1)]
    const outverts3: Vec3[] = []
    h.clipFaceAgainstPlane(inverts3, outverts3, new Vec3(0, 0, 1), 0.0)
    expect(outverts3.length).toBe(4)
  })

  test('clipFaceAgainstHull', () => {
    const hullA = createBoxHull(0.5)
    const res: { point: Vec3; normal: Vec3; depth: number }[] = []
    const sepNormal = new Vec3(0, 0, 1)
    const posA = new Vec3(0, 0, 0.45)
    const quatA = new Quaternion()

    const worldVertsB = [new Vec3(-1.0, -1.0, 0), new Vec3(-1.0, 1.0, 0), new Vec3(1.0, 1.0, 0), new Vec3(1.0, -1.0, 0)]

    hullA.clipFaceAgainstHull(sepNormal, posA, quatA, worldVertsB, -100, 100, res)
    expect(res).toBeDefined()
  })

  test('clipAgainstHull', () => {
    const hullA = createBoxHull(0.6)
    const posA = new Vec3(-0.5, 0, 0)
    const quatA = new Quaternion()

    const hullB = createBoxHull(0.5)
    const posB = new Vec3(0.5, 0, 0)
    const quatB = new Quaternion()

    const sepaxis = new Vec3()
    hullA.findSeparatingAxis(hullB, posA, quatA, posB, quatB, sepaxis)
    const result: { point: Vec3; normal: Vec3; depth: number }[] = []

    quatB.setFromAxisAngle(new Vec3(0, 0, 1), Math.PI / 4)
    hullA.clipAgainstHull(posA, quatA, hullB, posB, quatB, sepaxis, -100, 100, result)
    expect(result).toBeDefined()
  })

  test('testSepAxis', () => {
    const hullA = createBoxHull(0.5)
    const posA = new Vec3(-0.2, 0, 0)
    const quatA = new Quaternion()

    const hullB = createBoxHull()
    const posB = new Vec3(0.2, 0, 0)
    const quatB = new Quaternion()

    const sepAxis = new Vec3(1, 0, 0)
    const found1 = hullA.testSepAxis(sepAxis, hullB, posA, quatA, posB, quatB)
    expect(found1).toBeCloseTo(0.6)

    posA.x = -5
    const found2 = hullA.testSepAxis(sepAxis, hullB, posA, quatA, posB, quatB)
    expect(found2).toBe(false)

    posA.x = 1
    quatB.setFromAxisAngle(new Vec3(0, 0, 1), Math.PI / 4)
    const found3 = hullA.testSepAxis(sepAxis, hullB, posA, quatA, posB, quatB)
    expect(typeof found3).toBe('number')
  })

  test('findSeparatingAxis', () => {
    const hullA = createBoxHull()
    const posA = new Vec3(-0.2, 0, 0)
    const quatA = new Quaternion()

    const hullB = createBoxHull()
    const posB = new Vec3(0.2, 0, 0)
    const quatB = new Quaternion()

    const sepaxis = new Vec3()
    const found = hullA.findSeparatingAxis(hullB, posA, quatA, posB, quatB, sepaxis)
    expect(found).toBe(true)

    quatB.setFromAxisAngle(new Vec3(0, 0, 1), Math.PI / 4)
    const found2 = hullA.findSeparatingAxis(hullB, posA, quatA, posB, quatB, sepaxis)
    expect(found2).toBe(true)
  })

  test('project', () => {
    const convex = createBoxHull(0.5)
    const pos = new Vec3(0, 0, 0)
    const quat = new Quaternion()
    const axis = new Vec3(1, 0, 0)
    const result: number[] = []

    ConvexPolyhedron.project(convex, axis, pos, quat, result)
    expect(result).toEqual([0.5, -0.5])

    axis.set(-1, 0, 0)
    ConvexPolyhedron.project(convex, axis, pos, quat, result)
    expect(result).toEqual([0.5, -0.5])

    axis.set(0, 1, 0)
    ConvexPolyhedron.project(convex, axis, pos, quat, result)
    expect(result).toEqual([0.5, -0.5])

    pos.set(0, 1, 0)
    axis.set(0, 1, 0)
    ConvexPolyhedron.project(convex, axis, pos, quat, result)
    expect(result).toEqual([1.5, 0.5])

    quat.setFromAxisAngle(new Vec3(1, 0, 0), Math.PI / 2)
    pos.set(0, 1, 0)
    axis.set(0, 1, 0)
    ConvexPolyhedron.project(convex, axis, pos, quat, result)
    expect(Math.abs(result[0] - 1.5)).toBeLessThan(0.01)
    expect(Math.abs(result[1] - 0.5)).toBeLessThan(0.01)
  })
})
