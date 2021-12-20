import React, { createContext, FC, useContext } from 'react'
import { fc, testProp } from 'jest-fast-check'
import { mapValue } from '@utils/dicts'
import { renderHook } from '@testing-library/react-hooks'
import { expectType } from 'tsd'

import { makeCommonProvider } from './makeCommonProvider'
import { render } from '@testing-library/react'

const contextsDataArbitrary = fc
  .array(fc.lorem({ mode: 'words' }))
  .chain((keys) => {
    const recordPairs = keys.map((key) => [key, fc.tuple(fc.anything(), fc.anything())] as const)
    return fc.record(Object.fromEntries(recordPairs))
  })
  .map((contextsData) => {
    const contexts = mapValue(contextsData, ([initial]) => createContext(initial))
    const updatedData = mapValue(contextsData, ([, updated]) => updated)

    return [contexts, updatedData] as const
  })

testProp(
  'Данные из контекстов доступны внутри созданного компонента',
  [contextsDataArbitrary],
  ([contexts, updatedData]) => {
    const Root = makeCommonProvider(contexts)

    const { result } = renderHook(
      () => {
        const pairs = Object.entries(contexts).map(([key, context]) => [key, useContext(context)] as const)

        return Object.fromEntries(pairs)
      },
      {
        wrapper: ({ children }) => <Root {...updatedData}>{children}</Root>,
      }
    )

    expect(result.current).toEqual(updatedData)
  }
)

describe('Корректный тип результата', () => {
  const contexts = {
    first: createContext('test'),
    second: createContext(10),
  }

  test('Для вызова без прокси', () => {
    const R = makeCommonProvider(contexts)

    render(
      <R first="123" second={12}>
        TEST
      </R>
    )
  })

  test('Для вызова с прокси', () => {
    const proxy: (data: { a: number }) => { first: string; second: number } = jest.fn()

    expectType<FC<{ a: number }>>(makeCommonProvider(contexts, proxy))
  })
})
