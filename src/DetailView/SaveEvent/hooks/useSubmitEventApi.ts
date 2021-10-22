import { useCallback, useMemo, useRef } from 'react'

type Subscriber = () => Promise<boolean> | void

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useSaveEventApi() {
  const subscribesrsRef = useRef<Subscriber[]>([])

  const dispatch = useCallback(async (): Promise<boolean | null> => {
    const results = await Promise.all(
      subscribesrsRef.current
        .map((subscriber) => subscriber())
        .filter((promise): promise is Promise<boolean> => !!promise)
    )
    if (results.length === 0) {
      return null
    }
    return results.every((item) => item === true)
  }, [])

  const on = useCallback((subscriber: Subscriber) => {
    if (subscribesrsRef.current.includes(subscriber)) {
      return
    }
    subscribesrsRef.current.push(subscriber)
  }, [])

  const off = useCallback((subscriber: Subscriber) => {
    subscribesrsRef.current = subscribesrsRef.current.filter((item) => item !== subscriber)
  }, [])

  return useMemo(() => ({ dispatch, on, off }), [dispatch, off, on])
}

export type UseSaveEventApiResult = ReturnType<typeof useSaveEventApi>
