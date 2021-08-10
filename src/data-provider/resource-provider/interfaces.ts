import { AxiosInstance } from 'axios'

import { FetchFn, QueryResourceOptions, FetchOptions } from './hooks/fetch-resource/interfaces'
import { MutateFn, MutationOptions } from './hooks/mutate-resource/interfaces'

import { ResourceProviderClientConfig } from './ResourceProviderClient'

export type ResourceProviderOptions = Partial<ResourceProviderConfig>
export interface FetchResourceConfig<ResourceData> {
  fn: FetchFn<ResourceData>
  query?: QueryResourceOptions<ResourceData>
  fetch?: FetchOptions<ResourceData>
}
export interface MutateResourceConfig<ResourceData, SourceData> {
  fn: MutateFn<ResourceData, SourceData>
  options?: MutationOptions<ResourceData, SourceData>
}

export interface FetchResourceOptions<ResourceData> extends Partial<FetchResourceConfig<ResourceData>> {}

interface ResourceQueriesConfig<ResourceData, SourceData = ResourceData> {
  mutate: MutateResourceConfig<ResourceData, SourceData>
  fetchResource: FetchResourceConfig<ResourceData>
  fetchList: FetchResourceConfig<ResourceData>
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

export type ResourceOptionsOrKey<ResourceData, SourceData = ResourceData> =
  | ResourceOptions<ResourceData, SourceData>
  | string

export interface ResourceProps<ResourceData = unknown, SourceData = ResourceData> {
  resource: ResourceOptionsOrKey<ResourceData, SourceData>
}
