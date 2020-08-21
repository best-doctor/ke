import type { Location } from 'history'

import type { Filter, TableFilter } from 'admin/providers'

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
    const queryFiltersObjectKeys = Object.keys(queryFiltersObject)

    return queryFiltersObjectKeys.map((name: string) => {
      const [filterName, filterOperation] = name.split('__')
      const value = queryFiltersObject[name]

      return { filterName, filterOperation, value }
    })
  }

  static removeDuplicates(filtersList: Filter[], uniquePropertyName: keyof Filter = 'filterName'): Filter[] {
    return filtersList.filter((obj: Filter, pos: number, arr: Filter[]) => {
      return arr.map((mapObj: Filter) => mapObj[uniquePropertyName]).indexOf(obj[uniquePropertyName]) === pos
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
        query.set(`${filter.filterName}__${filter.filterOperation}`, filter.value)
      } else {
        query.set(filter.filterName, filter.value)
      }
    })
  }

  static setFilters(location: Location, filters: Filter[], history: any): void {
    const query = new URLSearchParams(location.search)

    FilterManager.setQueryFilters(query, filters)

    history.replace({ ...history.location, search: query.toString() })
  }

  static resetFilters(history: any): void {
    history.push({
      search: '',
    })
  }

  static overrideFilters(filters: Filter[], history: any): void {
    const query = new URLSearchParams()

    FilterManager.setQueryFilters(query, filters)

    history.replace({ ...history.location, search: query.toString() })
  }
}

export { FilterManager }
