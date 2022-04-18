import { DependencyList, useCallback, useRef } from 'react'

/**
 * TODO: сделать что-то, чтобы при изменении deps переприменялись обработчики событий
 * Основная проблема, что их довольно сложно удалять из eventManager. Возможно,
 * в таких ситуациях нужно просто целиком пересоздавать его, если это допустимо
 * в рамках API яндекса.
 */

export function useAddEventsCallback(
  callback: (control: never) => void,
  deps: DependencyList
): (control: never | null) => void {
  const eventsHasAddedRef = useRef(false)

  return useCallback((control: never | null) => {
    if (!control || eventsHasAddedRef.current) {
      return
    }
    callback(control)
    eventsHasAddedRef.current = true

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
