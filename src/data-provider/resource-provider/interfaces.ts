import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { FetchQueryOptions, MutateOptions, UseQueryOptions, UseMutationResult, UseQueryResult } from 'react-query'
import { ResourceProviderClientConfig } from './ResourceProviderClient'

// Объект опций для провайдера. Может быть прокинут при декларативном
// описании поля, и быть модифицированным внутри виджета, который
// использует ресурс

export interface QueryResourceOptions<ResourceData, TError = unknown> extends UseQueryOptions<ResourceData, TError> {
  requestConfig?: RequestConfig
}

export interface MutateResourceOptions<ResourceData, TError = unknown, TVariables = void, TContext = unknown>
  extends MutateOptions<ResourceData, TError, TVariables, TContext> {
  requestConfig?: RequestConfig
}
export interface FetchResourceOptions<ResourceData, TError = unknown> extends FetchQueryOptions<ResourceData, TError> {
  requestConfig?: RequestConfig
}

/** Хук, квери, который знает свой ресурс и возвращает данные
 * и метаинформацию о запросе. Может модифицировать ResourceOptions,
 * отправленные снаружи.
 * TODO: options можно сделать accessor-ом, но подумать
 * к каким данным он предоставляет доступ
 */

export type ResourceQueryResult<ResourceData, TError = unknown> = UseQueryResult<ResourceData, TError>
export type ResourceQuery<ResourceData> = (
  options?: QueryResourceOptions<ResourceData>
) => ResourceQueryResult<ResourceData>

export type ResourceMutateResult<
  ResourceData,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
> = UseMutationResult<ResourceData, TError, TVariables, TContext>

export type ResourceMutate<ResourceData, TError = unknown, TVariables = void, TContext = unknown> = (
  options?: MutateResourceOptions<ResourceData>
) => UseMutationResult<ResourceData, TError, TVariables, TContext>

export interface RequestConfig extends AxiosRequestConfig {
  lookupField?: string | number
}

export type FetchResourceByKey<ResourceData = unknown> = (
  resourceKey: string,
  config?: RequestConfig
) => Promise<ResourceData>

export type FetchResource<ResourceData = unknown> = (
  config?: FetchResourceOptions<ResourceData>
) => Promise<ResourceData>

export type MutateResource<ResourceData = unknown, SourceData = ResourceData> = (
  resourceKey: string,
  data?: SourceData,
  config?: RequestConfig
) => Promise<ResourceData>

export interface ResourceProviderConfig {
  clientConfig?: ResourceProviderClientConfig
  fetchResource: FetchResourceByKey<unknown>
  fetchList: FetchResourceByKey<unknown>
  mutateResource: MutateResource<unknown>
}

export interface ResourceSourceConfig {
  key: string
  query?: Partial<{
    requestFn?: FetchResourceByKey<unknown>
    options?: QueryResourceOptions<unknown>
  }>
  mutate?: Partial<{
    mutateFn?: MutateResource<unknown>
    options?: MutateResourceOptions<unknown>
  }>
  fetchResource?: Partial<{
    options: FetchResourceOptions<unknown>
  }>
  fetchList?: Partial<{
    options: FetchResourceOptions<unknown>
  }>
}

export interface ListResponse<T> {
  data: T[]
}

export type HttpClient = AxiosInstance
