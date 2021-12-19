import React, { createContext, useContext } from 'react'
import { fc, testProp } from 'jest-fast-check'
import { mapValue } from '@utils/dicts'
import { renderHook } from '@testing-library/react-hooks'

import { makeCommonProvider } from './makeCommonProvider'

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
