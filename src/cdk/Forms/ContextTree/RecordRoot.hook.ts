import { Provider, useCallback } from 'react'

import { TreeContext } from './Tree.context'
import { RootContext, RootProviderDesc } from './types'

export function useRecordRoot<K extends string | number, T>(
  recRoot: Record<K, T>,
  onChange: (recRoot: Record<K, T>) => void
): RootProviderDesc<T> {
  const setter = useCallback(
    (key: string | number, updater: (val: T) => T) => {
      checkKeyInRecord(key, recRoot)
      const updated = updater(recRoot[key as K])
      if (recRoot[key as K] !== updated) {
        onChange({
          ...recRoot,
          [key]: updated,
        })
      }
    },
    [recRoot, onChange]
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
