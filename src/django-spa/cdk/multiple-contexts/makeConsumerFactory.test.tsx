import React, { createContext, FC } from 'react'
import { testProp, fc } from 'jest-fast-check'
import { mapValue, pick } from '@utils/dicts'
import { expectType } from 'tsd'
import { render } from '@testing-library/react'

import { makeConsumerFactory } from './makeConsumerFactory'

const contextsArbitraryWithKeys = fc.dictionary(fc.string(), fc.anything()).chain((dict) => {
  const contexts = mapValue(dict, (v) => createContext(v))
  return fc.tuple(fc.constant(contexts), fc.constant(dict), fc.shuffledSubarray(Object.keys(dict)))
})

const proxyMakerResultArbitrary = fc.dictionary(fc.lorem({ mode: 'words' }), fc.anything())

const targetResult = fc.string({ minLength: 10 })

testProp(
  'Итоговая компонент получает данные из контекстов по ключам',
  [contextsArbitraryWithKeys, targetResult],
  ([contexts, data, keys], result) => {
    const targetSpy = jest.fn().mockReturnValue(result)
    const maker = makeConsumerFactory(contexts)
    const Consumer = maker(keys)

    render(<Consumer as={targetSpy} />)

    expect(targetSpy).toHaveBeenCalledTimes(1)
    expect(targetSpy).toHaveBeenCalledWith(pick(data, keys), {})
  }
)

testProp(
  'Итоговая компонент использует прокси',
  [contextsArbitraryWithKeys, proxyMakerResultArbitrary, targetResult],
  ([contexts, data, keys], proxyResult, result) => {
    const proxySpy = jest.fn().mockReturnValue(proxyResult)
    const targetSpy = jest.fn().mockReturnValue(result)
    const maker = makeConsumerFactory(contexts)
    const Consumer = maker(keys, proxySpy)

    render(<Consumer as={targetSpy} />)

    expect(proxySpy).toHaveBeenCalledTimes(1)
    expect(proxySpy).toHaveBeenCalledWith(pick(data, keys))
    expect(targetSpy).toHaveBeenCalledWith(proxyResult, {})
  }
)

describe('Функция возвращает корректный тип', () => {
  const contexts = {
    a: createContext('test'),
    b: createContext(12),
  }

  test('Без прокси', () => {
    expectType<(keys: ('a' | 'b')[]) => FC<{ as: FC<{ a: string; b: number }> }>>(makeConsumerFactory(contexts))
  })

  test('С прокси', () => {
    expectType<(keys: ('a' | 'b')[], proxy: () => { z: boolean }) => FC<{ as: FC<{ z: boolean }> }>>(
      makeConsumerFactory(contexts)
    )
  })
})
