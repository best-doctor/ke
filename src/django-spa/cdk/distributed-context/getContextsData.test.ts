import { fc, testProp } from 'jest-fast-check'
import { mapValue } from '@utils/dicts'
import { createContext } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { getContextsData } from './getContextsData'

const contextsDataArbitrary = fc.dictionary(fc.string(), fc.anything())

testProp('Получаем корректные данные из контекстов', [contextsDataArbitrary], (data) => {
  const contexts = mapValue(data, (v) => createContext(v))

  const { result } = renderHook(() => getContextsData(contexts))

  expect(result.current).toEqual(data)
})
