import { RefObject, useEffect, useRef } from 'react'

export function useIsMounted(): RefObject<boolean> {
  const isMountedRef = useRef(true)

  useEffect(
    () => () => {
      isMountedRef.current = false
    },
    []
  )

  return isMountedRef
}
