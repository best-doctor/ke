import React, { createContext, useContext, useMemo, PropsWithChildren } from 'react'

import { FiltersValue } from './types'

const WherePanelContext = createContext<WhereContext>([{}, defaultOnChange])

/**
 * Определяет основной контекст компонентов Where с данными по текущему значению
 * фильтров и коллбэку для их изменения
 */
export function WhereProvider<K extends string>({
  filters,
  onFiltersChange,
  children,
}: WhereProviderProps<K>): JSX.Element {
  const providerValue = useMemo((): WhereContext => [filters, onFiltersChange], [filters, onFiltersChange])
  return <WherePanelContext.Provider value={providerValue}>{children}</WherePanelContext.Provider>
}

/**
 * Возвращает текущее значение контекста компонентов Where
 */
export function useWhereFilters(): WhereContext {
  return useContext(WherePanelContext)
}

function defaultOnChange(): never {
  throw new Error("WherePanel onFiltersChange callback hasn't provided.")
}

type WhereProviderProps<K extends string> = PropsWithChildren<{
  /** Значение фильтров */
  filters: FiltersValue<K>
  /** Коллбэк на изменение значения фильтров */
  onFiltersChange: (filters: FiltersValue<K>) => void
}>

type WhereContext = [FiltersValue, (filters: FiltersValue) => void]
