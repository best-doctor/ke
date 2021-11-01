import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export function useChangeEffect(callback: EffectCallback, deps?: DependencyList): void {
  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
