import type { AxiosInstance } from 'axios'
import axios from 'axios'

import { FilterManager } from '../../utils/filterManager'

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

  public get httpClient(): AxiosInstance {
    return this.http
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
    const response = await this.http.get(`${resourceUrl}${objectId}/`)
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
    const url = new URL(baseUrl)

    const searchParamsObject = FilterManager.convertSearchParamsToObject(url.searchParams)
    const filters = FilterManager.parseQueryFilters(searchParamsObject)

    return [`${url.origin}${url.pathname}`, filters]
  }

  getUrl = (
    resourceUrl: string,
    resourceFilters: Filter[] | null = null,
    filters: Filter[] | null = null,
    page: number | null = null
  ): string => {
    const url = new URL(resourceUrl)

    if (filters) {
      FilterManager.setQueryFilters(url.searchParams, filters)
    }

    if (resourceFilters) {
      FilterManager.setQueryFilters(url.searchParams, resourceFilters)
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
