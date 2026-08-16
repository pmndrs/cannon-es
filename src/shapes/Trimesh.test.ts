import { Trimesh } from './Trimesh'
import { Plane } from './Plane'
import { Vec3 } from '../math/Vec3'
import { Quaternion } from '../math/Quaternion'
import { Body } from '../objects/Body'
import { World } from '../world/World'

describe('Trimesh', () => {
  test('updateNormals', () => {
    const mesh = Trimesh.createTorus()
    mesh.normals[0] = 1
    mesh.updateNormals()
    expect(mesh.normals[0]).not.toBe(1)
  })

  test('updateAABB', () => {
    const mesh = Trimesh.createTorus()
    mesh.aabb.lowerBound.set(1, 2, 3)
    mesh.updateAABB()
    expect(mesh.aabb.lowerBound.y).not.toBe(2)
  })

  describe('updateTree', () => {
    test('scaled', () => {
      const mesh = Trimesh.createTorus()
      mesh.updateTree()

      const bigMesh = Trimesh.createTorus()
      bigMesh.setScale(new Vec3(2, 2, 2))

      expect(bigMesh.aabb.upperBound.x).toBe(mesh.aabb.upperBound.x * 2)
      expect(bigMesh.tree.aabb.upperBound.x).toBe(mesh.tree.aabb.upperBound.x)
    })
  })

  describe('getTrianglesInAABB', () => {
    test('unscaled', () => {
      const mesh = Trimesh.createTorus(1, 1, 32, 32)
      let result: number[] = []

      const aabb = mesh.aabb.clone()
      mesh.getTrianglesInAABB(aabb, result)
      expect(result.length).toBe(mesh.indices.length / 3)

      result = []
      aabb.lowerBound.scale(0.1, aabb.lowerBound)
      aabb.upperBound.scale(0.1, aabb.upperBound)
      mesh.getTrianglesInAABB(aabb, result)
      expect(result.length).toBeLessThan(mesh.indices.length / 3)
    })
  })

  describe('getVertex', () => {
    test('unscaled', () => {
      const mesh = Trimesh.createTorus()
      const vertex = new Vec3()
      mesh.getVertex(0, vertex)
      expect(vertex).toEqual(new Vec3(mesh.vertices[0], mesh.vertices[1], mesh.vertices[2]))
    })

    test('scaled', () => {
      const mesh = Trimesh.createTorus()
      mesh.setScale(new Vec3(1, 2, 3))
      const vertex = new Vec3()
      mesh.getVertex(0, vertex)
      expect(vertex).toEqual(new Vec3(1 * mesh.vertices[0], 2 * mesh.vertices[1], 3 * mesh.vertices[2]))
    })
  })

  test('getWorldVertex', () => {
    const mesh = Trimesh.createTorus()
    const vertex = new Vec3()
    mesh.getWorldVertex(0, new Vec3(), new Quaternion(), vertex)
    expect(vertex).toEqual(new Vec3(mesh.vertices[0], mesh.vertices[1], mesh.vertices[2]))
  })

  test('getTriangleVertices', () => {
    const mesh = Trimesh.createTorus()
    const va = new Vec3()
    const vb = new Vec3()
    const vc = new Vec3()
    const va1 = new Vec3()
    const vb1 = new Vec3()
    const vc1 = new Vec3()
    mesh.getVertex(mesh.indices[0], va)
    mesh.getVertex(mesh.indices[1], vb)
    mesh.getVertex(mesh.indices[2], vc)
    mesh.getTriangleVertices(0, va1, vb1, vc1)
    expect(va).toEqual(va1)
    expect(vb).toEqual(vb1)
    expect(vc).toEqual(vc1)
  })

  test('getNormal', () => {
    const mesh = Trimesh.createTorus()
    const normal = new Vec3()
    mesh.getNormal(0, normal)
    expect(new Vec3(mesh.normals[0], mesh.normals[1], mesh.normals[2])).toEqual(normal)
  })

  test('calculateLocalInertia', () => {
    const mesh = Trimesh.createTorus()
    const inertia = new Vec3()
    mesh.calculateLocalInertia(1, inertia)
    expect(inertia).toBeDefined()
  })

  test('calculateWorldAABB', () => {
    const poly = Trimesh.createTorus()
    const min = new Vec3()
    const max = new Vec3()
    poly.calculateWorldAABB(new Vec3(1, 0, 0), new Quaternion(0, 0, 0, 1), min, max)
    expect(isNaN(min.x)).toBe(false)
    expect(isNaN(max.x)).toBe(false)
  })

  test('volume', () => {
    const mesh = Trimesh.createTorus()
    expect(mesh.volume()).toBeGreaterThan(0)
  })

  test('narrowphase against plane', () => {
    const world = new World()

    const torusShape = Trimesh.createTorus()
    const torusBody = new Body({ mass: 1 })
    torusBody.addShape(torusShape)

    const planeBody = new Body({ mass: 1 })
    planeBody.addShape(new Plane())

    world.addBody(torusBody)
    world.addBody(planeBody)

    world.step(1 / 60)
  })
})
