import { useState, useEffect } from 'react'

export function useControlState<T>(initial: T): [T, (val: T) => void] {
  const [state, updater] = useState(initial)

  useEffect(() => {
    updater(initial)
  }, [initial])

  return [state, updater]
}
