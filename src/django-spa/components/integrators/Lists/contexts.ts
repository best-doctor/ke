import { createContext } from 'react'

import { DataContext, ParamsContext, SelectedContext, StatusContext } from './types'

/**
 * Контекст для массива элементов, к которым рендерится список, а так же для
 * напрямую связанной с этим информацией
 */
export const dataContext = createContext<Readonly<DataContext>>({ items: [], total: 0 })

/**
 * Контекст с фильтрами и прочими параметрами, для которых был получен массив
 * элементов, а так же функцией для их обновления
 */
export const paramsContext = createContext<Readonly<ParamsContext>>([
  {
    filters: {},
    order: {},
    pagination: {
      currentPage: 1,
      itemsPerPage: 1,
    },
  },
  () => undefined,
])

/**
 * Контекст с данными по текущему статусу элементов в компоненте
 */
export const statusContext = createContext<Readonly<StatusContext>>({ isLoading: false, isNotLoaded: true })

/**
 * Контекст с списком выбранных элементов из всего массива, и функцией для обновления этого списка
 */
export const selectedContext = createContext<Readonly<SelectedContext>>([[], () => undefined])
