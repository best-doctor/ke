import React, { ComponentType, FC } from 'react'
import { testProp, fc } from 'jest-fast-check'
import { render, cleanup } from '@testing-library/react'
import { expectType } from 'tsd'

import { innersArbitrary, rootResultArbitrary } from './fixtures'
import { InnerComponents, Integrator } from './types'
import { proxyIntegratorRoot } from './proxyIntegratorRoot'

const proxyResultArbitrary = fc.dictionary(fc.string(), fc.anything())

test('Рендер результата ведёт к рендеру корня с результатом из proxy', () => {
  fc.assert(
    fc
      .property(innersArbitrary, rootResultArbitrary, proxyResultArbitrary, (inners, rootResult, proxyResult) => {
        const rootSpy = jest.fn().mockReturnValue(rootResult)
        const proxySpy = jest.fn().mockReturnValue(proxyResult)
        const testInt = makeTestIntegrator(rootSpy, inners)
        const ProxiedInt = proxyIntegratorRoot(testInt, proxySpy)

        const { getByText } = render(<ProxiedInt />)

        expect(getByText(rootResult)).toBeInTheDocument()
        expect(rootSpy).toHaveBeenCalledTimes(1)
        expect(rootSpy).toHaveBeenCalledWith(proxyResult, {})
      })
      .afterEach(cleanup)
  )
})

testProp('Inners соответствуют переданным', [innersArbitrary], (inners) => {
  const rootSpy = jest.fn()
  const proxySpy = jest.fn()
  const testInt = makeTestIntegrator(rootSpy, inners)
  const ProxiedInt = proxyIntegratorRoot(testInt, proxySpy)

  Object.entries(inners).forEach(([key, value]) => {
    expect(ProxiedInt[key]).toBe(value)
  })
})

test('Корректный тип результата', () => {
  const root: FC<{ a: string; b: number }> = jest.fn()
  const inners: { First: FC<{ a: string }>; Second: FC<{ z: boolean }> } = {
    First: jest.fn(),
    Second: jest.fn(),
  }
  const Base = undefined as unknown as Integrator<typeof root, typeof inners>

  expectType<FC<{ c: boolean; d: string }> & { First: FC<{ a: string }>; Second: FC<{ z: boolean }> }>(
    proxyIntegratorRoot(Base, (_props: { c: boolean; d: string }) => ({ a: '1', b: 2 }))
  )
})

function makeTestIntegrator(root: ComponentType<any>, inners: InnerComponents): Integrator {
  return Object.assign(root, inners)
}
