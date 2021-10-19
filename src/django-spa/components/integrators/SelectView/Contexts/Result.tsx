import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react'

import { SelectResult, SelectStatus } from './types'

const SelectResultContext = createContext<ResultContext>({ result: null, status: { isLoading: false } })

/**
 * Определяет контекст c результатами текущей выборки и её статусом
 * Для получения данных используйте {@link useSelectResult}
 */
export function SelectResultProvider({
  result,
  status,
  children,
}: PropsWithChildren<{ result: SelectResult; status: SelectStatus }>): JSX.Element {
  const contextValue = useMemo(() => ({ result, status }), [result, status])
  return <SelectResultContext.Provider value={contextValue}>{children}</SelectResultContext.Provider>
}

export function useSelectResult(): ResultContext {
  return useContext(SelectResultContext)
}

interface ResultContext {
  /** Результат выборки, если есть */
  result: SelectResult | null
  /** Состояние выборки */
  status: SelectStatus
}
