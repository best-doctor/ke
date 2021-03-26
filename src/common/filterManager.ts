import type { Location, History } from 'history'

import type { Filter, TableFilter } from 'admin/providers/interfaces'
import { getAccessor } from '../DetailView/utils/dataAccess'

type QueryFilter = {
  [key: string]: string
}

class FilterManager {
  static getUrlSearchParamsObject(queryFilters: string): URLSearchParams {
    return new URLSearchParams(queryFilters)
  }

  static convertSearchParamsToObject(searchParams: URLSearchParams): QueryFilter {
    // eslint-disable-next-line
    // @ts-ignore
    return Object.fromEntries(searchParams)
  }

  static convertQueryStringToObject(queryFilters: string): QueryFilter {
    const searchParams = FilterManager.getUrlSearchParamsObject(queryFilters)

    return FilterManager.convertSearchParamsToObject(searchParams)
  }

  static parseQueryFilters(queryFiltersObject: QueryFilter): Filter[] {
    return Object.entries(queryFiltersObject).map(([name, value]) => {
      const parts = name.split('__')
      let filterOperation
      if (parts.length > 1) filterOperation = parts.pop()
      const filterName = parts.join('__')

      return { filterName, filterOperation, value }
    })
  }

  static removeDuplicates(
    filtersList: Filter[],
    uniquePropertyNames: (keyof Filter)[] = ['filterName', 'filterOperation']
  ): Filter[] {
    const uniqueKeys = new Set()
    return filtersList.filter((mapObj: Filter) => {
      const key = uniquePropertyNames.map((k) => mapObj[k] || '').join('|')
      if (uniqueKeys.has(key)) {
        return false
      }
      uniqueKeys.add(key)
      return true
    })
  }

  static getQueryFilters(queryFilters: string): Filter[] {
    const queryFiltersObject = FilterManager.convertQueryStringToObject(queryFilters)

    return FilterManager.parseQueryFilters(queryFiltersObject)
  }

  static getFilters(queryFilters: string): Filter[] {
    const filters = [...FilterManager.getQueryFilters(queryFilters)]

    return FilterManager.removeDuplicates(filters)
  }

  static extractTableFilters(tableFilters: TableFilter[]): Filter[] {
    return tableFilters.map((tableFilter: TableFilter) => tableFilter.value)
  }

  static setQueryFilters(query: URLSearchParams, filters: Filter[]): void {
    filters.forEach((filter: Filter) => {
      if (filter.filterOperation) {
        query.set(`${filter.filterName}__${filter.filterOperation}`, getAccessor(filter.value))
      } else {
        query.set(filter.filterName, getAccessor(filter.value))
      }
    })
  }

  static setFilters(location: Location, filters: Filter[], history: History): void {
    const query = new URLSearchParams(location.search)

    FilterManager.setQueryFilters(query, filters)

    history.replace({ ...history.location, search: query.toString() })
  }

  static resetFilters(history: History): void {
    history.push({
      search: '',
    })
  }

  static overrideFilters(filters: Filter[], history: History): void {
    const query = new URLSearchParams()

    FilterManager.setQueryFilters(query, filters)

    history.replace({ ...history.location, search: query.toString() })
  }
}

export { FilterManager }
