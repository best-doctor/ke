import { createContext } from 'react'

import { DataContext, ParamsContext, SelectedContext, StatusContext } from './types'

export const dataContext = createContext<DataContext>({ items: [], total: 0 })

export const paramsContext = createContext<ParamsContext>([
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

export const statusContext = createContext<StatusContext>({ isLoading: false, isNotLoaded: true })

export const selectedContext = createContext<SelectedContext>([[], () => undefined])
