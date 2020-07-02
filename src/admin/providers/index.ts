import type { AxiosInstance } from 'axios'
import axios from 'axios'

export type Filter = {
  filterName: string
  value: string
  filterOperation: string | undefined
}

export type TableFilter = {
  id: string
  value: Filter
}

export type Pagination = {
  page: number
  perPage: number
  count: number | undefined
  nextUrl: string | undefined
  prevUrl: string | undefined
}

export abstract class BaseProvider {
  constructor(private readonly http: AxiosInstance = axios.create({})) {
    this.http = http
  }

  getList = async (
    url: string,
    filters: Filter[] | null = null,
    page: number | null = null
  ): Promise<[Model[], Array<TableFilter>, Pagination]> => {
    const [resourceUrl, resourceFilters] = this.parseUrl(url)
    const generatedUrl = this.getUrl(resourceUrl, resourceFilters, filters, page)

    return this.navigate(generatedUrl, resourceFilters)
  }

  getObject = async (resourceUrl: string, objectId: string): Promise<Model> => {
    const response = await this.http.get(resourceUrl + objectId)
    return response.data.data
  }

  post = async (resourceUrl: string, payload: any): Promise<Model> => {
    const response = await this.http.post(resourceUrl, payload)
    return response.data.data
  }

  put = async (resourceUrl: string, payload: any): Promise<Model> => {
    const response = await this.http.put(resourceUrl, payload)
    return response.data.data
  }

  navigate = async (url: string, resourceFilters: Filter[]): Promise<[Model[], Array<TableFilter>, Pagination]> => {
    const response = await this.http.get(url)
    const { data, meta } = response.data
    const [tableFilters, pagination] = this.getFiltersAndPagination(meta, resourceFilters)
    return [data, tableFilters, pagination]
  }

  parseUrl = (baseUrl: string): [string, Filter[]] => {
    const filters: Array<Filter> = []
    const url = new URL(baseUrl)
    url.searchParams.forEach((value, param) => {
      const [filterName, filterOperation] = param.split('__', 1)
      filters.push({ filterName, value, filterOperation })
    })
    return [`${url.origin}${url.pathname}`, filters]
  }

  getFilterQuery = (filter: Filter): [string, string] => {
    const { filterName, value, filterOperation } = filter

    let filterQuery = filterName.toString()

    if (filterOperation) {
      filterQuery = `${filterName}__${filterOperation}`
    }

    return [filterQuery, value]
  }

  getUrl = (
    resourceUrl: string,
    resourceFilters: Filter[] | null = null,
    filters: Filter[] | null = null,
    page: number | null = null
  ): string => {
    const url = new URL(resourceUrl)

    if (filters) {
      filters.forEach((filter: Filter) => {
        const [queryParam, queryValue] = this.getFilterQuery(filter)
        url.searchParams.set(queryParam, queryValue)
      })
    }

    if (resourceFilters) {
      resourceFilters.forEach((element: Filter) => {
        const [queryParam, queryValue] = this.getFilterQuery(element)
        url.searchParams.set(queryParam, queryValue)
      })
    }

    if (page) {
      url.searchParams.set('page', page.toString())
    }

    return url.href
  }

  getFiltersAndPagination = (meta: any, resourceFilters: Filter[]): [Array<TableFilter>, Pagination] => {
    const defaultPagination = { page: 1, perPage: 100, count: undefined, nextUrl: undefined, prevUrl: undefined }

    if (meta === undefined) {
      return [[], defaultPagination]
    }

    const { page, per_page: perPage, total: count, url, next_url: nextUrl, prev_url: prevUrl } = meta
    const [, backendFilters] = this.parseUrl(url)
    const pagination: Pagination = { page, perPage, nextUrl, prevUrl, count }
    const excludeNames = ['page', 'per_page', ...resourceFilters.map(({ filterName }: Filter) => filterName)]
    const tableFilters: Array<TableFilter> = []

    backendFilters.forEach((filter: Filter) => {
      if (!excludeNames.includes(filter.filterName)) {
        tableFilters.push({ id: filter.filterName, value: filter })
      }
    })
    return [tableFilters, pagination]
  }
}
