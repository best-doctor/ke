import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react'

import { ListViewData, ListViewStatus } from './types'

const ListDataContext = createContext<DataContext>({ data: null, status: { isLoading: false } })

/**
 * Определяет контекст c результатами текущей выборки и её статусом
 * Для получения данных используйте {@link useListData}
 */
export function ListDataProvider({
  data,
  status,
  children,
}: PropsWithChildren<{ data: ListViewData; status: ListViewStatus }>): JSX.Element {
  const contextValue = useMemo(() => ({ data, status }), [data, status])
  return <ListDataContext.Provider value={contextValue}>{children}</ListDataContext.Provider>
}

export function useListData(): DataContext {
  return useContext(ListDataContext)
}

interface DataContext {
  /** Результат выборки, если есть */
  data: ListViewData | null
  /** Состояние выборки */
  status: ListViewStatus
}
