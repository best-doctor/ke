import { expectType } from 'tsd'
import { render } from '@testing-library/react'
import { testProp, fc } from 'jest-fast-check'
import React, { FC } from 'react'

import { makeDistributedContext } from './makeDistributedContext'

const contextDescArbitrary = fc.dictionary(fc.lorem(), fc.anything()).filter(
  (desc) =>
    Object.keys(desc)
      .map((key) => key.trim())
      .filter(Boolean).length > 2
)

testProp('Данные из корневого элемента пробрасываются в потребителей', [contextDescArbitrary], (contextDesc) => {
  const [Root, makeConsumer] = makeDistributedContext(contextDesc)
  const consumers = Object.keys(contextDesc).map(
    (key) => [key, makeConsumer([key]), jest.fn().mockReturnValue(key)] as const
  )

  render(
    <Root {...contextDesc}>
      {consumers.map(([key, Consumer, Target]) => (
        <Consumer key={key} as={Target} />
      ))}
    </Root>
  )

  consumers.forEach(([key, , targetSpy]) => {
    expect(targetSpy).toHaveBeenCalledTimes(1)
    expect(targetSpy).toHaveBeenCalledWith({ [key]: contextDesc[key] }, {})
  })
})

testProp('Прокси-функция потребителей вызывается корректно', [contextDescArbitrary], (contextDesc) => {
  const [Root, makeConsumer] = makeDistributedContext(contextDesc)
  const consumers = Object.keys(contextDesc).map((key) => {
    const proxy = jest.fn().mockReturnValue({ [key]: key })
    return [key, makeConsumer([key], proxy), jest.fn().mockReturnValue(key), proxy] as const
  })

  render(
    <Root {...contextDesc}>
      {consumers.map(([key, Consumer, Target]) => (
        <Consumer key={key} as={Target} />
      ))}
    </Root>
  )

  consumers.forEach(([key, , targetSpy, proxySpy]) => {
    expect(proxySpy).toHaveBeenCalledTimes(1)
    expect(proxySpy).toHaveBeenCalledWith({ [key]: contextDesc[key] })
    expect(targetSpy).toHaveBeenCalledWith({ [key]: key }, {})
  })
})

describe('Корректные типы результата', () => {
  test('Корневого компонента', () => {
    const [Root] = makeDistributedContext<{ a: unknown[]; b: string }>({ a: [], b: '' })

    expectType<FC<{ a: unknown[]; b: string }>>(Root)
  })

  test('Фабричной функции полиморфных consumer-компонентов для одного ключа', () => {
    const [, maker] = makeDistributedContext<{ a: unknown[]; b: string }>({ a: [], b: '' })
    const subA: FC<{ a: unknown[]; d: number }> = jest.fn().mockReturnValue('SubA')
    const C = maker(['a'])

    render(<C as={subA} d={10} />)
  })

  test('Фабричной функции полиморфных consumer-компонентов для одного нескольких ключей', () => {
    const [, maker] = makeDistributedContext<{ a: unknown[]; b: string }>({ a: [], b: '' })
    const subAB: FC<{ a: unknown[]; b: string; d: number }> = jest.fn().mockReturnValue('SubAB')

    const C = maker(['a', 'b'])

    render(<C as={subAB} d={10} />)
  })

  test('Фабричной функции полиморфных consumer-компонентов c прокси', () => {
    const [, maker] = makeDistributedContext<{ a: unknown[]; b: string; c: boolean }>({ a: [], b: '', c: false })
    const subZ: FC<{ z: boolean; d: number }> = jest.fn().mockReturnValue('SubZ')
    const proxy: (data: { a: unknown[]; b: string }) => { z: boolean } = jest.fn()

    const C = maker(['a', 'b'], proxy)

    render(<C as={subZ} d={10} />)
  })
})
