import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { partial } from '@utils/Funcs'

import { Defined, ListViewParams, Updatable } from './types'

const ListParamsContext = createContext<Updatable<ListViewParams>>([{}, notInitContext])

function notInitContext(): never {
  throw new Error(`Not initialized ListParams context`)
}

/**
 * Определяет контекст с параметрами запроса текущей выборки и колбэк для их изменения.
 * Данные можно получить через хуки: {@link useListFilters}, {@link useListOrder}, {@link useListPagination}
 */
export function ListParamsProvider({
  value,
  onChange,
  children,
}: PropsWithChildren<ListParamsProviderProps>): JSX.Element {
  const providerValue = useMemo(() => [value, onChange] as Updatable<ListViewParams>, [value, onChange])

  return <ListParamsContext.Provider value={providerValue}>{children}</ListParamsContext.Provider>
}

interface ListParamsProviderProps {
  /** Значение параметров текущей выборки */
  value: ListViewParams
  /** Колбэк для изменения параметров */
  onChange: (params: ListViewParams) => void
}

/**
 * Возвращает текущее значение параметров выборки и колбэк для их изменения
 */
export function useListParams(): Updatable<ListViewParams> {
  return useContext(ListParamsContext)
}

function useParamsSubContext<K extends keyof ListViewParams>(
  subContextKey: K,
  defaultValue: Defined<ListViewParams[K]>
): Updatable<Defined<ListViewParams[K]>> {
  const [params, onChange] = useContext(ListParamsContext)

  return useMemo(
    () => [
      (params[subContextKey] || defaultValue) as Defined<ListViewParams[K]>,
      (changed) => onChange({ ...params, [subContextKey]: changed }),
    ],
    [params, onChange, subContextKey, defaultValue]
  )
}

/**
 * Возвращает текущее значение фильтров и колбэк для их изменения
 */
export const useListFilters = partial(useParamsSubContext, 'filters' as const, {})

/**
 * Возвращает текущее значение параметров сортировки и колбэк для их изменения
 */
export const useListOrder = partial(useParamsSubContext, 'orderBy' as const, {})

/**
 * Возвращает текущее значение пагинации и колбэк для его изменения
 */
export const useListPagination = partial(useParamsSubContext, 'pagination' as const, { page: null, perPage: 0 })
