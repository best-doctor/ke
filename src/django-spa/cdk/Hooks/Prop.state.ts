import { useState, useEffect } from 'react'

export function usePropState<T>(initial: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [state, updater] = useState(initial)

  useEffect(() => {
    updater(initial)
  }, [initial])

  return [state, updater]
}

export function useFactoryPropState<T>(factory: () => T, dependencies: readonly unknown[]): [T, (val: T) => void] {
  const [state, updater] = useState(factory)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updater(factory()), dependencies)

  return [state, updater]
}
