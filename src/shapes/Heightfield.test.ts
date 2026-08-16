import { Heightfield } from './Heightfield'
import { Vec3 } from '../math/Vec3'
import { Quaternion } from '../math/Quaternion'

function createHeightfield(options: { size?: number; elementSize?: number; minValue?: number; linear?: boolean } = {}) {
  const matrix: number[][] = []
  const size = options.size || 20
  for (let i = 0; i < size; i++) {
    matrix.push([])
    for (let j = 0; j < size; j++) {
      if (options.linear) {
        matrix[i].push(i + j)
      } else {
        matrix[i].push(1)
      }
    }
  }
  return new Heightfield(matrix, options)
}

describe('Heightfield', () => {
  test('calculateWorldAABB', () => {
    const hfShape = createHeightfield({ elementSize: 1, minValue: 0 })
    const min = new Vec3()
    const max = new Vec3()
    hfShape.calculateWorldAABB(new Vec3(), new Quaternion(), min, max)

    expect(min.x).toBe(-Number.MAX_VALUE)
    expect(max.x).toBe(Number.MAX_VALUE)
    expect(min.y).toBe(-Number.MAX_VALUE)
    expect(max.y).toBe(Number.MAX_VALUE)
  })

  test('getConvexTrianglePillar', () => {
    const hfShape = createHeightfield({ elementSize: 1, minValue: 0, size: 2 })

    hfShape.getConvexTrianglePillar(0, 0, false)
    expect(hfShape.pillarConvex.vertices.length).toBe(6)
    expect(hfShape.pillarConvex.vertices.slice(0, 3)).toEqual([
      new Vec3(-0.25, -0.25, 0.5),
      new Vec3(0.75, -0.25, 0.5),
      new Vec3(-0.25, 0.75, 0.5),
    ])
    expect(hfShape.pillarOffset).toEqual(new Vec3(0.25, 0.25, 0.5))

    hfShape.getConvexTrianglePillar(0, 0, true)
    expect(hfShape.pillarConvex.vertices.length).toBe(6)
    expect(hfShape.pillarConvex.vertices.slice(0, 3)).toEqual([
      new Vec3(0.25, 0.25, 0.5),
      new Vec3(-0.75, 0.25, 0.5),
      new Vec3(0.25, -0.75, 0.5),
    ])
    expect(hfShape.pillarOffset).toEqual(new Vec3(0.75, 0.75, 0.5))

    expect(() => {
      hfShape.getConvexTrianglePillar(1, 1, true)
    }).toThrow()
    expect(() => {
      hfShape.getConvexTrianglePillar(1, 1, false)
    }).toThrow()
    expect(() => {
      hfShape.getConvexTrianglePillar(-1, 0, false)
    }).toThrow()
  })

  test('getTriangle', () => {
    const hfShape = createHeightfield({ elementSize: 1, minValue: 0, size: 2 })
    const a = new Vec3()
    const b = new Vec3()
    const c = new Vec3()

    hfShape.getTriangle(0, 0, false, a, b, c)
    expect(a).toEqual(new Vec3(0, 0, 1))
    expect(b).toEqual(new Vec3(1, 0, 1))
    expect(c).toEqual(new Vec3(0, 1, 1))

    hfShape.getTriangle(0, 0, true, a, b, c)
    expect(a).toEqual(new Vec3(1, 1, 1))
    expect(b).toEqual(new Vec3(0, 1, 1))
    expect(c).toEqual(new Vec3(1, 0, 1))
  })

  test('getRectMinMax', () => {
    const hfShape = createHeightfield()
    const minMax: number[] = []
    hfShape.getRectMinMax(0, 0, 1, 1, minMax)
    expect(minMax).toEqual([1, 1])
  })

  test('getHeightAt', () => {
    const hfShape = createHeightfield({ size: 2, elementSize: 1, linear: true })

    const h0 = hfShape.getHeightAt(0, 0, false)
    const h1 = hfShape.getHeightAt(0.25, 0.25, false)
    const h2 = hfShape.getHeightAt(0.75, 0.75, false)
    const h3 = hfShape.getHeightAt(0.99, 0.99, false)

    expect(h0).toBe(0)
    expect(h0).toBeLessThan(h1)
    expect(h1).toBeLessThan(h2)
    expect(h2).toBeLessThan(h3)
  })

  test('update', () => {
    const hfShape = createHeightfield()
    hfShape.update()
  })

  test('updateMaxValue', () => {
    const hfShape = createHeightfield()
    hfShape.data[0][0] = 10
    hfShape.updateMaxValue()
    expect(hfShape.maxValue).toBe(10)
  })

  test('updateMinValue', () => {
    const hfShape = createHeightfield()
    hfShape.data[0][0] = -10
    hfShape.updateMinValue()
    expect(hfShape.minValue).toBe(-10)
  })

  test('setHeightValueAtIndex', () => {
    const hfShape = createHeightfield()
    hfShape.setHeightValueAtIndex(0, 0, 10)
    expect(hfShape.data[0][0]).toBe(10)
  })

  test('getIndexOfPosition', () => {
    const hfShape = createHeightfield()
    const result: number[] = []
    hfShape.getIndexOfPosition(0, 0, result, false)
    expect(result).toEqual([0, 0])
  })
})
