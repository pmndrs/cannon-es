import { Box } from './Box'
import { Vec3 } from '../math/Vec3'
import { Quaternion } from '../math/Quaternion'

describe('Box', () => {
  test('forEachWorldCorner', () => {
    const box = new Box(new Vec3(1, 1, 1))
    const pos = new Vec3()
    const quat = new Quaternion()
    quat.setFromAxisAngle(new Vec3(0, 0, 1), Math.PI * 0.25)
    let numCorners = 0
    const unique: Vec3[] = []
    box.forEachWorldCorner(pos, quat, (x: number, y: number, z: number) => {
      const corner = new Vec3(x, y, z)
      for (let i = 0; i < unique.length; i++) {
        expect(corner.almostEquals(unique[i])).toBe(false)
      }
      unique.push(corner)
      numCorners++
    })
    expect(numCorners).toBe(8)
  })

  test('calculateWorldAABB', () => {
    const box = new Box(new Vec3(1, 1, 1))
    const min = new Vec3()
    const max = new Vec3()
    box.calculateWorldAABB(new Vec3(3, 0, 0), new Quaternion(0, 0, 0, 1), min, max)
    expect(min.x).toBe(2)
    expect(max.x).toBe(4)
    expect(min.y).toBe(-1)
    expect(max.y).toBe(1)
  })
})
