import { AxiosInstance } from 'axios'

import { FetchFn, QueryOptions, FetchOptions } from './hooks/fetch-resource/interfaces'
import { MutateFn, MutationOptions } from './hooks/mutate-resource/interfaces'

import { ResourceProviderClientConfig } from './ResourceProviderClient'

export type ResourceProviderOptions = Partial<ResourceProviderConfig>
export interface FetchResourceConfig<ResourceData> {
  fn: FetchFn<ResourceData>
}
export interface MutateResourceConfig<ResourceData, SourceData> {
  fn: MutateFn<ResourceData, SourceData>
}

interface ResourceQueriesConfig<ResourceData, SourceData = ResourceData> {
  mutate: MutateResourceConfig<ResourceData, SourceData>
  fetchResource: FetchResourceConfig<ResourceData>
}

export interface ResourceConfig<ResourceData = unknown, SourceData = ResourceData>
  extends ResourceQueriesConfig<ResourceData, SourceData> {
  key: string
}

export interface ResourceDefaultConfig<ResourceData = unknown, SourceData = ResourceData>
  extends ResourceQueriesConfig<ResourceData, SourceData> {
  client: AxiosInstance
}

export interface ResourceProviderConfig extends ResourceDefaultConfig {
  clientConfig?: ResourceProviderClientConfig
}

export interface ResourceOptions<ResourceData = unknown, SourceData = ResourceData> {
  key: string
  mutate?: Partial<MutateResourceConfig<ResourceData, SourceData>>
  fetchResource?: Partial<FetchResourceConfig<ResourceData>>
  fetchList?: Partial<FetchResourceConfig<ResourceData>>
}

interface KeyConfig {
  key: string
}

export interface QueryResourceOptions<ResourceData = unknown> extends QueryOptions<ResourceData> {
  key: string
}

export interface MutateResourceOptions<
  ResourceData = unknown,
  SourceData = ResourceData,
  TError = unknown,
  TContext = unknown
> extends MutationOptions<ResourceData, SourceData, TError, TContext> {
  key: string
}

export interface FetchResourceOptions<ResourceData = unknown> extends FetchOptions<ResourceData> {
  key: string
}

export type ResourceOptionsOrKey<T extends KeyConfig> = T | string

export interface ResourceProps<T extends KeyConfig> {
  resource: ResourceOptionsOrKey<T>
}
