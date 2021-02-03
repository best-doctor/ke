import type { AxiosInstance } from 'axios'
import axios from 'axios'

import { FilterManager } from '../../common/filterManager'
import type { Filter, ResponseCache, Pagination, Provider, TableFilter } from './interfaces'

export class BaseProvider implements Provider {
  constructor(private readonly http: AxiosInstance = axios.create({}), readonly cache?: ResponseCache) {
    this.cache = cache
    this.http = http
  }

  public get httpClient(): AxiosInstance {
    return this.http
  }

  getPage = async (
    url: string | URL,
    filters: Filter[] | null = null,
    page: number | null = null,
    cacheTime?: number,
    forceCache?: boolean
  ): Promise<[Model[], Array<TableFilter>, Pagination]> => {
    const [resourceUrl, resourceFilters] = this.parseUrl(url)

    const generatedUrl = this.getUrl(resourceUrl, resourceFilters, filters, page)

    return this.navigate(generatedUrl, resourceFilters, cacheTime, forceCache)
  }

  getList = async (
    url: string | URL,
    filters: Filter[] | null = null,
    perPage: number | null = null,
    startPage: number | null = null,
    endPage: number | null = null,
    cacheTime?: number,
    forceCache?: boolean
  ): Promise<Model[]> => {
    const combinedFilters: Filter[] = [...(filters || [])]
    if (perPage) {
      combinedFilters.push({
        filterName: 'per_page',
        value: perPage.toString(),
        filterOperation: undefined,
      })
    }
    let page: number = startPage || 1
    let data: Model[] = []

    while (page) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const [pageData, , pagination] = await this.getPage(url, combinedFilters, page, cacheTime, forceCache)
        data = data.concat(pageData)
        page += 1
        if (pagination.nextUrl == null || (endPage && page > endPage)) page = 0
      } catch (err) {
        return data
      }
    }
    return data
  }

  getObject = async (resourceUrl: string, cacheTime?: number, forceCache?: boolean): Promise<Model> => {
    const response = await this.get(resourceUrl, cacheTime, forceCache)
    return response.data.data
  }

  post = async (resourceUrl: string, payload: object): Promise<Model> => {
    const response = await this.http.post(resourceUrl, payload)
    return response.data.data
  }

  put = async (resourceUrl: string, payload: object): Promise<Model> => {
    const response = await this.http.put(resourceUrl, payload)
    return response.data.data
  }

  patch = async (resourceUrl: string, payload: object): Promise<Model> => {
    const response = await this.http.patch(resourceUrl, payload)
    return response.data.data
  }

  get = async (resourceUrl: string, cacheTime?: number, forceCache?: boolean): Promise<any> => {
    let effectiveForceCache = forceCache
    if (!effectiveForceCache) {
      const cached = this.cache?.get(resourceUrl, cacheTime) || undefined
      if (cached !== undefined) return Promise.resolve(cached)
      effectiveForceCache = true
    }
    const response = this.http.get(resourceUrl)
    if (effectiveForceCache) response.then((data) => this.cache?.set(resourceUrl, data))
    return response
  }

  navigate = async (
    url: string,
    resourceFilters: Filter[],
    cacheTime?: number,
    forceCache?: boolean
  ): Promise<[Model[], Array<TableFilter>, Pagination]> => {
    const response = await this.get(url, cacheTime, forceCache)
    const { data, meta } = response.data
    const [tableFilters, pagination] = this.getFiltersAndPagination(meta, resourceFilters)

    return [data, tableFilters, pagination]
  }

  parseUrl = (baseUrl: string | URL): [string, Filter[]] => {
    let url = baseUrl
    if (typeof url === 'string') {
      url = new URL(url)
    }

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
