import React, { FC } from 'react'
import { testProp, fc } from 'jest-fast-check'
import { render, cleanup } from '@testing-library/react'
import { expectType } from 'tsd'

import { makeIntegrator } from './makeIntegrator'

const innersArbitrary = fc
  .array(fc.lorem({ mode: 'words' }))
  .map((keys) => Object.fromEntries(keys.map((key) => [key, jest.fn()])))

const rootResultArbitrary = fc.lorem()

test('Рендер результата ведёт к рендеру корня', () => {
  fc.assert(
    fc
      .property(innersArbitrary, rootResultArbitrary, (inners, rootResult) => {
        const rootSpy = jest.fn().mockReturnValue(rootResult)
        const Integrator = makeIntegrator(rootSpy, inners)

        const { getByText } = render(<Integrator />)

        expect(getByText(rootResult)).toBeInTheDocument()
      })
      .afterEach(cleanup)
  )
})

testProp('Inners соответствуют переданным с capitalized ключами', [innersArbitrary], (inners) => {
  const rootSpy = jest.fn()
  const Integrator = makeIntegrator(rootSpy, inners)

  Object.entries(inners).forEach(([key, value]) => {
    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1)
    expect(Integrator[capitalizedKey]).toBe(value)
  })
})

test('Корректный тип результата', () => {
  const root: FC<{ a: string; b: number }> = jest.fn()
  const inners: { first: FC<{ a: string }>; second: FC<{ z: boolean }> } = {
    first: jest.fn(),
    second: jest.fn(),
  }

  expectType<FC<{ a: string; b: number }> & { First: FC<{ a: string }>; Second: FC<{ z: boolean }> }>(
    makeIntegrator(root, inners)
  )
})
