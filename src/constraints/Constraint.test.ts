import { Constraint } from './Constraint'
import { Equation } from '../equations/Equation'
import { Body } from '../objects/Body'

describe('Constraint', () => {
  test('construct', () => {
    const bodyA = new Body()
    const bodyB = new Body()
    new Constraint(bodyA, bodyB)
  })

  test('enable and disable', () => {
    const bodyA = new Body()
    const bodyB = new Body()
    const c = new Constraint(bodyA, bodyB)
    const eq = new Equation(bodyA, bodyB)
    c.equations.push(eq)

    c.enable()
    expect(eq.enabled).toBe(true)

    c.disable()
    expect(eq.enabled).toBe(false)
  })
})
