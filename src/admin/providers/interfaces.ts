import type { AxiosInstance } from 'axios'
import type { Pagination, PaginationParameters } from './pagination'

interface Filter {
  filterName: string
  value: string
  filterOperation?: string
}

interface TableFilter {
  id: string
  value: Filter
}

interface ResponseCache {
  cacheTime: number

  get(cacheKey: string, cacheTime?: number): any
  set(cacheKey: string, value: any): void
}

type GetListParameters = {
  perPage?: number
  startPage?: number
  endPage?: number
  before?: string | null
  after?: string | null
}

interface Provider {
  readonly cache?: ResponseCache
  httpClient: AxiosInstance

  getPage(
    url: string | URL,
    filters?: Filter[] | null,
    paginationParameters?: PaginationParameters | null | null,
    cacheTime?: number,
    forceCache?: boolean
  ): Promise<[Model[], Array<TableFilter>, Pagination]>

  getList(
    url: string | URL,
    filters?: Filter[] | null,
    parameters?: GetListParameters | null,
    cacheTime?: number,
    forceCache?: boolean
  ): Promise<Model[]>

  getObject(resourceUrl: string, cacheTime?: number, forceCache?: boolean): Promise<Model>

  get(resourceUrl: string, cacheTime?: number, forceCache?: boolean): Promise<any>

  post(resourceUrl: string, payload: object): Promise<Model>

  put(resourceUrl: string, payload: object): Promise<Model>

  patch(resourceUrl: string, payload: object): Promise<Model>
}

export { Filter, GetListParameters, Provider, ResponseCache, TableFilter }
