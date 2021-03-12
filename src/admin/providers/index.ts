import type { AxiosInstance } from 'axios'
import axios from 'axios'

import { FilterManager } from '../../common/filterManager'
import type { Filter, ResponseCache, Provider, TableFilter, GetListParameters } from './interfaces'
import { CursorPagination, Pagination, PagedPagination, PaginationParameters } from './pagination'
import { setPaginationParameters } from './utils'

/**
 * Base for Django REST API interactions
 *
 * @example Usage
 * # Contents of `provider.ts`
 * ```ts
 * import { BaseProvider } from '@bestdoctor/ke'
 * import { httpClient } from 'client'
 *
 * export class Provider extends BaseProvider {
 *   constructor() {
 *     super(axios.create({
 *       baseURL: 'https://localhost/',
 *     }))
 *   }
 * }
 * ```
 *
 * @public
 */
export class BaseProvider implements Provider {
  /**
   * @param http - axios-instance used for all http requests
   * @param cache - optional cache-object for temporary store all got results by their URLs
   */
  constructor(private readonly http: AxiosInstance = axios.create({}), readonly cache?: ResponseCache) {
    this.cache = cache
    this.http = http
  }

  public get httpClient(): AxiosInstance {
    return this.http
  }

  /**
   * Load one 'page' of resource from backend
   *
   * Try to load a standard slice of all resource models. Useful for paginated lists.
   *
   * @param url - resource url
   * @param filters - filters accepted by resource API
   * @param paginationParameters - requested pagination parameters
   * @param cacheTime - time in seconds for caching result
   * @param forceCache - don't use cache if true
   */
  getPage = async (
    url: string | URL,
    filters: Filter[] | null = null,
    paginationParameters: PaginationParameters | null = null,
    cacheTime?: number,
    forceCache?: boolean
  ): Promise<[Model[], Array<TableFilter>, Pagination]> => {
    const [resourceUrl, resourceFilters] = this.parseUrl(url)

    const generatedUrl = this.getUrl(resourceUrl, resourceFilters, filters, paginationParameters)

    return this.navigate(generatedUrl, resourceFilters, cacheTime, forceCache)
  }

  /**
   * Load several adjacent `pages` of resource from backend.
   *
   * Try to load several adjacent slices of all resource models. Make request per page.
   *
   * @param url - resource url
   * @param filters - filters accepted by resource API
   * @param parameters - list parameters
   * @param cacheTime - time in seconds for caching result
   * @param forceCache - don't use cache if true
   */
  getList = async (
    url: string | URL,
    filters: Filter[] | null = null,
    parameters: GetListParameters | null = null,
    cacheTime?: number,
    forceCache?: boolean
  ): Promise<Model[]> => {
    const combinedFilters: Filter[] = [...(filters || [])]
    const perPage = parameters?.perPage
    if (perPage) {
      combinedFilters.push({
        filterName: 'per_page',
        value: perPage.toString(),
        filterOperation: undefined,
      })
    }
    let localUrl = url
    let hasNext = true
    let page: number | undefined = parameters?.startPage
    let data: Model[] = []

    while (hasNext) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const [pageData, , pagination] = await this.getPage(localUrl, combinedFilters, { page }, cacheTime, forceCache)
        data = data.concat(pageData)
        hasNext = pagination.hasNext({ endPage: parameters?.endPage })
        const { prevUrl, nextUrl } = pagination
        if ('page' in pagination || ('after' in pagination && (pagination as CursorPagination).after !== undefined)) {
          localUrl = nextUrl as string
          page = undefined
        } else if ('before' in pagination && (pagination as CursorPagination).before !== undefined) {
          localUrl = prevUrl as string
        }
      } catch (err) {
        return data
      }
    }
    return data
  }

  /**
   * Load single resource model
   *
   * @param resourceUrl - resource URL
   * @param cacheTime - time in seconds for caching result
   * @param forceCache - don't use cache if true
   */
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
    const tableFilters = this.getFilters(meta, resourceFilters)
    const pagination = this.getPagination(meta)

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
    paginationParameters: PaginationParameters | null = null
  ): string => {
    const url = new URL(resourceUrl)

    if (filters) {
      FilterManager.setQueryFilters(url.searchParams, filters)
    }

    if (resourceFilters) {
      FilterManager.setQueryFilters(url.searchParams, resourceFilters)
    }

    if (paginationParameters) {
      setPaginationParameters(url, paginationParameters)
    }

    return url.href
  }

  /**
   * Get pagination from meta.
   *
   * Looks for proper keys in meta to determine type of pagination (paged or cursor).
   * Falls back to default paged pagination.
   *
   * @param meta - response meta
   */
  getPagination = (meta: any): Pagination => {
    const defaultPagination = {
      page: 1,
      perPage: 100,
      count: undefined,
      nextUrl: undefined,
      prevUrl: undefined,
      hasNext: () => false,
    }

    if (meta === undefined) {
      return defaultPagination
    }
    if ('page' in meta) {
      return new PagedPagination(meta)
    }
    if ('has_next' in meta) {
      return new CursorPagination(meta)
    }

    return defaultPagination
  }

  /**
   * Get filters from meta.
   *
   * Ignores get-parameters for pagination.
   *
   * @param meta  - response meta
   * @param resourceFilters - resourse filters to ignore
   */
  getFilters = (meta: any, resourceFilters: Filter[]): Array<TableFilter> => {
    if (meta === undefined) {
      return []
    }
    const { url } = meta
    const [, backendFilters] = this.parseUrl(url)

    const excludeNames = [
      'page',
      'before',
      'after',
      'per_page',
      ...resourceFilters.map(({ filterName }: Filter) => filterName),
    ]
    const tableFilters: Array<TableFilter> = []

    backendFilters.forEach((filter: Filter) => {
      if (!excludeNames.includes(filter.filterName)) {
        tableFilters.push({ id: filter.filterName, value: filter })
      }
    })
    return tableFilters
  }
}

export { Provider }
