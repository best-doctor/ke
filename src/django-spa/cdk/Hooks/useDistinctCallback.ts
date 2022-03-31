import { useCallback, useRef } from 'react'

export function useDistinctCallback<Cb extends (v: any) => void, T extends Parameters<Cb>[0]>(
  cb: Cb | undefined,
  equal?: (prev: T, cur: T) => boolean
): Cb {
  const prevValueRef = useRef<T>()
  const firstCallRef = useRef(true)

  return useCallback(
    (value: any) => {
      if (
        !firstCallRef.current ||
        (equal ? !equal(prevValueRef.current as T, value) : prevValueRef.current !== value)
      ) {
        firstCallRef.current = false
        prevValueRef.current = value
        cb && cb(value)
      }
    },
    [cb, equal]
  ) as Cb
}
