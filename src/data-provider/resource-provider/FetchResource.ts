import { QueryClient } from 'react-query'
import merge from 'deepmerge'
import { FetchResource, FetchResourceByKey, FetchResourceOptions } from './interfaces'

export function createFetchResource(
  queryClient: QueryClient,
  fetchFunction: FetchResourceByKey<any>,
  resourceKey: string,
  options: FetchResourceOptions<unknown> = {}
) {
  return <ResourceData>(config: FetchResourceOptions<ResourceData> = {}): Promise<ResourceData> => {
    const merged = merge(options, config)
    const { requestConfig = {}, ...fetchConfig } = merged
    const { lookupField, params } = requestConfig
    return queryClient.fetchQuery<ResourceData>(
      [resourceKey, lookupField, params],
      () => fetchFunction(resourceKey, requestConfig),
      fetchConfig
    )
  }
}

export function createFetchList(
  queryClient: QueryClient,
  fetchFunction: FetchResourceByKey<any>,
  resourceKey: string,
  options: FetchResourceOptions<unknown> = {}
): FetchResource<unknown> {
  return <ResourceData>(config: FetchResourceOptions<ResourceData> = {}): Promise<ResourceData> => {
    const merged = merge(options, config)
    const { requestConfig = {}, ...fetchConfig } = merged
    const { lookupField, params } = requestConfig
    return queryClient.fetchQuery<ResourceData>(
      [resourceKey, lookupField, params],
      () => fetchFunction(resourceKey, requestConfig),
      fetchConfig
    )
  }
}
