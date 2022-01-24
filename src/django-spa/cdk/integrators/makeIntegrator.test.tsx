import React, { FC } from 'react'
import { testProp, fc } from 'jest-fast-check'
import { render, cleanup } from '@testing-library/react'
import { expectType } from 'tsd'

import { innersArbitrary, rootResultArbitrary } from './fixtures'
import { makeIntegrator } from './makeIntegrator'

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

testProp('Inners соответствуют переданным', [innersArbitrary], (inners) => {
  const rootSpy = jest.fn()
  const Integrator = makeIntegrator(rootSpy, inners)

  Object.entries(inners).forEach(([key, value]) => {
    expect(Integrator[key]).toBe(value)
  })
})

test('Корректный тип результата', () => {
  const root: FC<{ a: string; b: number }> = jest.fn()
  const inners: { First: FC<{ a: string }>; Second: FC<{ z: boolean }> } = {
    First: jest.fn(),
    Second: jest.fn(),
  }

  expectType<FC<{ a: string; b: number }> & { First: FC<{ a: string }>; Second: FC<{ z: boolean }> }>(
    makeIntegrator(root, inners)
  )
})
