import { Provider, useCallback } from 'react'
import { isEqual } from '@utils/Types'

import { TreeContext } from './Tree.context'
import { RootContext, RootProviderDesc, Updater } from './types'

export function useRecordRoot<K extends string | number, T>(
  recRoot: Record<K, T>,
  onChange: (updater: Updater<Record<K, T>>) => void
): RootProviderDesc<T> {
  const setter = useCallback(
    (key: string | number, updater: Updater<T>) =>
      onChange((prev) => {
        checkKeyInRecord(key, prev)
        const updated = updater(prev[key as K])
        return isEqual(prev[key as K], updated) ? prev : { ...prev, [key]: updated }
      }),
    [onChange]
  )

  const getter = useCallback(
    (key: string | number): T => {
      checkKeyInRecord(key, recRoot)
      return recRoot[key as K]
    },
    [recRoot]
  )

  return [TreeContext.Provider as Provider<RootContext<T>>, { value: [getter, setter] }]
}

function checkKeyInRecord(key: string | number, record: Record<string | number, unknown>): void {
  if (!(key in record)) {
    throw new RangeError(`Key "${key}" not exists in Record Root. Available keys: ${Object.keys(record)} `)
  }
}
