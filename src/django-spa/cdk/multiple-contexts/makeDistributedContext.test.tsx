import { expectType } from 'tsd'
import { render } from '@testing-library/react'
import { testProp, fc } from 'jest-fast-check'
import React, { createContext, FC } from 'react'
import { mapValue } from '@utils/dicts'

import { makeDistributedContext } from './makeDistributedContext'

const contextsArbitrary = fc
  .dictionary(fc.lorem({ mode: 'words' }), fc.anything())
  .filter(
    (desc) =>
      Object.keys(desc)
        .map((key) => key.trim())
        .filter(Boolean).length > 2
  )
  .map((desc) => [mapValue(desc, (val) => createContext(val)), desc] as const)

testProp('Данные из корневого элемента пробрасываются в потребителей', [contextsArbitrary], ([contexts, data]) => {
  const [Root, makeConsumer] = makeDistributedContext(contexts)
  const consumers = Object.keys(contexts).map(
    (key) => [key, makeConsumer([key]), jest.fn().mockReturnValue(key)] as const
  )

  render(
    <Root {...data}>
      {consumers.map(([key, Consumer, Target]) => (
        <Consumer key={key} as={Target} />
      ))}
    </Root>
  )

  consumers.forEach(([key, , targetSpy]) => {
    expect(targetSpy).toHaveBeenCalledTimes(1)
    expect(targetSpy).toHaveBeenCalledWith({ [key]: data[key] }, {})
  })
})

testProp('Прокси-функция потребителей вызывается корректно', [contextsArbitrary], ([contexts, data]) => {
  const [Root, makeConsumer] = makeDistributedContext(contexts)
  const consumers = Object.keys(contexts).map((key) => {
    const proxy = jest.fn().mockReturnValue({ [key]: key })
    return [key, makeConsumer([key], proxy), jest.fn().mockReturnValue(key), proxy] as const
  })

  render(
    <Root {...data}>
      {consumers.map(([key, Consumer, Target]) => (
        <Consumer key={key} as={Target} />
      ))}
    </Root>
  )

  consumers.forEach(([key, , targetSpy, proxySpy]) => {
    expect(proxySpy).toHaveBeenCalledTimes(1)
    expect(proxySpy).toHaveBeenCalledWith({ [key]: data[key] })
    expect(targetSpy).toHaveBeenCalledWith({ [key]: key }, {})
  })
})

describe('Корректные типы результата', () => {
  const testContexts = {
    a: createContext<string[]>([]),
    b: createContext(false),
  }

  test('Корневого компонента', () => {
    const [Root] = makeDistributedContext(testContexts)

    expectType<FC<{ a: string[]; b: boolean }>>(Root)
  })

  test('Фабричной функции полиморфных consumer-компонентов для одного ключа', () => {
    const [, maker] = makeDistributedContext(testContexts)
    const subA: FC<{ a: string[]; d: number }> = jest.fn().mockReturnValue('SubA')
    const C = maker(['a'])

    expectType<FC<{ as: typeof subA; d: number }>>(C)
  })

  test('Фабричной функции полиморфных consumer-компонентов для одного нескольких ключей', () => {
    const [, maker] = makeDistributedContext(testContexts)
    const subAB: FC<{ a: string[]; b: boolean; d: number }> = jest.fn().mockReturnValue('SubAB')

    const C = maker(['a', 'b'])

    expectType<FC<{ as: typeof subAB; d: number }>>(C)
  })

  test('Фабричной функции полиморфных consumer-компонентов c прокси', () => {
    const [, maker] = makeDistributedContext(testContexts)
    const subZ: FC<{ z: boolean; d: number }> = jest.fn().mockReturnValue('SubZ')
    const proxy: (data: { a: string[]; b: boolean }) => { z: boolean } = jest.fn()

    const C = maker(['a', 'b'], proxy)

    expectType<FC<{ as: typeof subZ; d: number }>>(C)
  })
})
