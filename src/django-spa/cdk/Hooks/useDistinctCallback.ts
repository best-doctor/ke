import { useCallback, useRef } from 'react'

export function useDistinctCallback<Cb extends (v: any) => void, T extends Parameters<Cb>[0]>(
  cb: Cb | undefined,
  equal?: (prev: T, cur: T) => boolean,
  initial?: T
): Cb {
  const prevValueRef = useRef<T | undefined>(initial)
  const firstCallRef = useRef(true)

  return useCallback(
    (value: any) => {
      if (firstCallRef.current || (equal ? !equal(prevValueRef.current as T, value) : prevValueRef.current !== value)) {
        firstCallRef.current = false
        prevValueRef.current = value
        cb && cb(value)
      }
    },
    [cb, equal]
  ) as Cb
}
