import { useState, useCallback } from 'react'

export function usePartialState<T extends Record<string, unknown>>(initial: T): [T, (val: Partial<T>) => void] {
  const [state, setState] = useState(initial)

  const setPartialState = useCallback((val: Partial<T>): void => setState((prev) => ({ ...prev, ...val })), [setState])

  return [state, setPartialState]
}
