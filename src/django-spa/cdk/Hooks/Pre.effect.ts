import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export function usePreEffect(callback: EffectCallback, deps?: DependencyList): boolean {
  const hasFirstRun = useRef(false)

  useEffect(() => {
    hasFirstRun.current = true
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return hasFirstRun.current
}
