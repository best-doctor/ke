import fc from 'fast-check'
import { createElement, FC, PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { useRecordRoot } from './ContextTree'

export const refArbitrary = fc.record({
  current: fc.constant(null),
})

export const fieldArbitrary = fc.record({
  value: fc.anything(),
  isTouched: fc.constant(false),
  inValidating: fc.constant(false),
  validated: fc.constant(false),
  errors: fc.constant(null),
  relatedRef: refArbitrary,
})

export const recordArbitrary = fc.dictionary(fc.string(), fieldArbitrary)

export const recordWithValidKeyArbitrary = recordArbitrary
  .filter((record) => Object.keys(record).length > 0)
  .chain((record) => fc.tuple(fc.constant(record), fc.constantFrom(...Object.keys(record))))

export const fieldErrorArbitrary = fc.record({
  level: fc.integer(),
  message: fc.string(),
})

export const fieldValidateResultArbitrary = fc.record({
  success: fc.boolean(),
  errors: fc.array(fieldErrorArbitrary),
})

export const recordWithValidateResultArbitrary = fc
  .dictionary(fc.string(), fc.anything())
  .filter((record) => !!Object.keys(record).length)
  .chain((record) =>
    fc.tuple(fc.constant(record), fc.dictionary(fc.constantFrom(...Object.keys(record)), fieldValidateResultArbitrary))
  )

export const arrayWithValidateResultArbitrary = fc
  .array(fc.anything(), { minLength: 1 })
  .chain((array) =>
    fc.tuple(
      fc.constant(array),
      fc.array(fieldValidateResultArbitrary, { minLength: array.length, maxLength: array.length })
    )
  )

export function makeRecordProvider(
  record: Record<string, unknown>,
  onChange: (val: unknown) => void
): FC<PropsWithChildren<{}>> {
  const {
    result: {
      current: [provider, providerProps],
    },
  } = renderHook(() => useRecordRoot(record, onChange))

  return ({ children }) => createElement(provider, { ...providerProps, children })
}
