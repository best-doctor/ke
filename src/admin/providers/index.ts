import type { AxiosInstance } from 'axios'
import axios from 'axios'

export type Filter = {
  name: string
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
  private resourceUrl: string

  private resourceFilters: Array<Filter>

  constructor(baseUrl: string, private readonly http: AxiosInstance = axios.create({})) {
    ;[this.resourceUrl, this.resourceFilters] = this.parseUrl(baseUrl)
  }

  parseUrl = (baseUrl: string): [string, Filter[]] => {
    const filters: Array<Filter> = []
    const url = new URL(baseUrl)
    url.searchParams.forEach((value, param) => {
      const [name, filterOperation] = param.split('__', 1)
      filters.push({ name, value, filterOperation })
    })
    return [`${url.origin}${url.pathname}`, filters]
  }

  getFilterQuery = (filter: Filter): [string, string] => {
    const { name, value, filterOperation } = filter

    let filterQuery = name.toString()

    if (filterOperation) {
      filterQuery = `${name}__${filterOperation}`
    }

    return [filterQuery, value]
  }

  getUrl = (filters: Array<TableFilter> | null = null, page: number | null = null): string => {
    const url = new URL(this.resourceUrl)

    if (filters) {
      filters.forEach(({ value }: TableFilter) => {
        const [queryParam, queryValue] = this.getFilterQuery(value)
        url.searchParams.set(queryParam, queryValue)
      })
    }

    this.resourceFilters.forEach((element: Filter) => {
      const [queryParam, queryValue] = this.getFilterQuery(element)
      url.searchParams.set(queryParam, queryValue)
    })

    if (page) {
      url.searchParams.set('page', page.toString())
    }

    return url.href
  }

  getList = async (
    filters: Array<TableFilter> | null = null,
    page: number | null = null
  ): Promise<[Model[], Array<TableFilter>, Pagination]> => {
    return this.navigate(this.getUrl(filters, page))
  }

  navigate = async (url: string): Promise<[Model[], Array<TableFilter>, Pagination]> => {
    const response = await this.http.get(url)
    const { data, meta } = response.data
    const [tableFilters, pagination] = this.getFiltersAndPagination(meta)
    return [data, tableFilters, pagination]
  }

  getObject = async (objectId: string): Promise<Model> => {
    const response = await this.http.get(this.resourceUrl + objectId)
    return response.data.data
  }

  getFiltersAndPagination = (meta: any): [Array<TableFilter>, Pagination] => {
    const { page, per_page: perPage, total: count, url, next_url: nextUrl, prev_url: prevUrl } = meta
    const [, backendFilters] = this.parseUrl(url)
    const pagination: Pagination = { page, perPage, nextUrl, prevUrl, count }
    const excludeNames = ['page', 'per_page', ...this.resourceFilters.map(({ name }: Filter) => name)]
    const tableFilters: Array<TableFilter> = []
    backendFilters.forEach((filter: Filter) => {
      if (!excludeNames.includes(filter.name)) {
        tableFilters.push({ id: filter.name, value: filter })
      }
    })
    return [tableFilters, pagination]
  }
}
