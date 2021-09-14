import { FetchQueryOptions, UseQueryOptions, UseQueryResult } from 'react-query'
import { RequestConfig } from '../../request-types'
import { SharedResourceOptions } from '../interfaces'

export interface QueryResourceOptions<ResourceData, TError = unknown>
  extends UseQueryOptions<ResourceData, TError>,
    SharedResourceOptions {
  requestConfig?: RequestConfig
}

export type ResourceQueryResult<ResourceData, TError = unknown> = UseQueryResult<ResourceData, TError>

export type FetchFn<ResourceData = unknown> = (
  resourceKey: string,
  config?: RequestConfig,
  pageParams?: any
) => Promise<ResourceData>

export interface FetchOptions<ResourceData, TError = unknown> extends FetchQueryOptions<ResourceData, TError> {
  requestConfig?: RequestConfig
}
