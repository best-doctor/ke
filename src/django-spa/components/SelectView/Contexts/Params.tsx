import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { partial } from '@utils/Funcs'

import { Defined, SelectParams, Updatable } from './types'

const SelectParamsContext = createContext<Updatable<SelectParams>>([{}, notInitContext])

function notInitContext(): never {
  throw new Error(`Not initialized SelectParams context`)
}

/**
 * Определяет контекст с параметрами запроса текущей выборки и колбэк для их изменения.
 * Данные можно получить через хуки: {@link useSelectFilters}, {@link useSelectOrder}, {@link useSelectPagination}
 */
export function SelectParamsProvider({
  value,
  onChange,
  children,
}: PropsWithChildren<SelectParamsProviderProps>): JSX.Element {
  const providerValue = useMemo(() => [value, onChange] as Updatable<SelectParams>, [value, onChange])

  return <SelectParamsContext.Provider value={providerValue}>{children}</SelectParamsContext.Provider>
}

interface SelectParamsProviderProps {
  /** Значение параметров текущей выборки */
  value: SelectParams
  /** Колбэк для изменения параметров */
  onChange: (params: SelectParams) => void
}

/**
 * Возвращает текущее значение параметров выборки и колбэк для их изменения
 */
export function useSelectParams(): Updatable<SelectParams> {
  return useContext(SelectParamsContext)
}

function useParamsSubContext<K extends keyof SelectParams>(
  subContextKey: K,
  defaultValue: Defined<SelectParams[K]>
): Updatable<Defined<SelectParams[K]>> {
  const [params, onChange] = useContext(SelectParamsContext)

  return useMemo(
    () => [
      (params[subContextKey] || defaultValue) as Defined<SelectParams[K]>,
      (changed) => onChange({ ...params, [subContextKey]: changed }),
    ],
    [params, onChange, subContextKey, defaultValue]
  )
}

/**
 * Возвращает текущее значение фильтров и колбэк для их изменения
 */
export const useSelectFilters = partial(useParamsSubContext, 'filters' as const, {})

/**
 * Возвращает текущее значение параметров сортировки и колбэк для их изменения
 */
export const useSelectOrder = partial(useParamsSubContext, 'orderBy' as const, {})

/**
 * Возвращает текущее значение пагинации и колбэк для его изменения
 */
export const useSelectPagination = partial(useParamsSubContext, 'pagination' as const, { page: null })
