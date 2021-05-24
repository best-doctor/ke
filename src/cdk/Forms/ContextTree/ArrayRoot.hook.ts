import { Provider, useCallback } from 'react'

import { TreeContext } from './Tree.context'
import { RootContext, RootProviderDesc } from './types'

export function useArrayRoot<T>(
  arrRoot: T[],
  onChange: (arrRoot: T[]) => void,
  getKey: (value: T, index: number) => string | number
): RootProviderDesc<T> {
  const setter = useCallback(
    (key: number | string, updater: (val: T) => T) => {
      const updatedIndex = arrRoot.findIndex((item, index) => key === getKey(item, index))

      if (updatedIndex < 0) {
        throw new RangeError(`Invalid key "${key}" for update Array Root. Available keys: ${arrRoot.map(getKey)}`)
      }

      const updated = updater(arrRoot[updatedIndex])
      if (arrRoot[updatedIndex] !== updated) {
        const updatedRoot = [...arrRoot]
        updatedRoot[updatedIndex] = updated
        onChange(updatedRoot)
      }
    },
    [arrRoot, onChange, getKey]
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

  return [TreeContext.Provider as Provider<RootContext<T>>, { value: [getter, setter] }]
}
