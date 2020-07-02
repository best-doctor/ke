import type { Filter, TableFilter } from 'admin/providers'

type QueryFilter = {
  [key: string]: string
}

class FilterManager {
  static convertQueryStringToObject(queryFilters: string): QueryFilter {
    // eslint-disable-next-line
    // @ts-ignore
    return Object.fromEntries(new URLSearchParams(queryFilters));
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
      return arr.map(
        (mapObj: Filter) => mapObj[uniquePropertyName]
      ).indexOf(obj[uniquePropertyName]) === pos;
    });
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
}

export { FilterManager }