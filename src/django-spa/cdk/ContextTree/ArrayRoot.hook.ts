import { Context, Provider, useCallback } from 'react'
import { isEqual } from '@utils/Types'

import { RootContext, RootProviderDesc, Updater } from './types'

export function useArrayRoot<T>(
  context: Context<RootContext>,
  arrRoot: T[],
  onChange: (updater: Updater<T[]>) => void,
  getKey: (value: T, index: number) => string | number
): RootProviderDesc<T> {
  const setter = useCallback(
    (key: number | string, updater: Updater<T>) =>
      onChange((prev) => {
        const updatedIndex = prev.findIndex((item, index) => key === getKey(item, index))

        if (updatedIndex < 0) {
          throw new RangeError(`Invalid key "${key}" for update Array Root. Available keys: ${prev.map(getKey)}`)
        }

        const updated = updater(prev[updatedIndex])
        if (!isEqual(prev[updatedIndex], updated)) {
          const updatedRoot = [...prev]
          updatedRoot[updatedIndex] = updated
          return updatedRoot
        }

        return prev
      }),
    [onChange, getKey]
  )

  const getter = useCallback(
    (key: string | number): T => {
      const getIndex = arrRoot.findIndex((item, index) => key === getKey(item, index))

      if (getIndex < 0) {
        throw new RangeError(`Invalid key "${key}" for Array Root. Available keys: ${arrRoot.map(getKey)}`)
      }

      return arrRoot[getIndex]
    },
    [arrRoot, getKey]
  )

  return [context.Provider as Provider<RootContext<T>>, { value: [getter, setter] }]
}
