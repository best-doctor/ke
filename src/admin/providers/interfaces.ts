import type { AxiosInstance } from 'axios'

interface Filter {
  filterName: string
  value: string
  filterOperation?: string
}

interface TableFilter {
  id: string
  value: Filter
}

interface Pagination {
  page: number
  perPage: number
  count?: number
  nextUrl?: string
  prevUrl?: string
}

interface ResponseCache {
  cacheTime: number

  get(cacheKey: string, cacheTime?: number): any
  set(cacheKey: string, value: any): void
}

interface Provider {
  readonly cache?: ResponseCache
  httpClient: AxiosInstance

  getPage(
    url: string | URL,
    filters?: Filter[] | null,
    page?: number | null,
    cacheTime?: number,
    forceCache?: boolean
  ): Promise<[Model[], Array<TableFilter>, Pagination]>

  getList(
    url: string | URL,
    filters?: Filter[] | null,
    perPage?: number | null,
    startPage?: number | null,
    endPage?: number | null,
    cacheTime?: number,
    forceCache?: boolean
  ): Promise<Model[]>

  getObject(resourceUrl: string, cacheTime?: number, forceCache?: boolean): Promise<Model>
}

export { Filter, Pagination, Provider, ResponseCache, TableFilter }
