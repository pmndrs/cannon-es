import { Sphere } from './Sphere'

describe('Sphere', () => {
  test('constructors with valid radii', () => {
    new Sphere(1)
    new Sphere(0)
  })

  test('throws on negative radius', () => {
    expect(() => {
      new Sphere(-1)
    }).toThrow()
  })
})
