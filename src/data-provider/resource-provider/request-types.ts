import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface PaginationMeta {
  last_url: string
  next_url: string | null
  page: number
  per_page: number
  prev_url: string | null
  total: number
  url: string
}

export interface ListResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface DetailResponse<T> {
  data: T
}

export interface RequestConfig extends AxiosRequestConfig {
  lookupField?: string | number
}

export type HttpClient = AxiosInstance

export type HttpResponse<T = any> = AxiosResponse<T>
