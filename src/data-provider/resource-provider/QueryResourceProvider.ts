/* eslint-disable arrow-body-style */
import merge from 'deepmerge'
import { useQuery } from 'react-query'
import { FetchResourceByKey, QueryResourceOptions, ResourceQuery, ResourceQueryResult } from './interfaces'

export function useQueryResource<ResourceData>(
  fetchResource: FetchResourceByKey<ResourceData>,
  resourceKey: string,
  config: QueryResourceOptions<ResourceData> = {}
): ResourceQueryResult<ResourceData> {
  const { requestConfig = {}, ...options } = config
  const { params, lookupField } = requestConfig
  return useQuery([resourceKey, lookupField, params], () => fetchResource(resourceKey, requestConfig), options)
}

export function queryResourceProvider<ResourceData>(
  fetchResource: FetchResourceByKey<ResourceData>,
  resourceKey: string,
  externalConfig: QueryResourceOptions<ResourceData> = {}
): ResourceQuery<ResourceData> {
  return (config: QueryResourceOptions<ResourceData> = {}, modifyFetchResource?: FetchResourceByKey<ResourceData>) =>
    useQueryResource(fetchResource || modifyFetchResource, resourceKey, merge(externalConfig, config))
}

export type GetResourceProvider<ResourceData = unknown> = (
  resourceKey: string,
  queryOptions?: QueryResourceOptions<ResourceData>,
  fetchResource?: FetchResourceByKey<ResourceData>
) => ResourceQuery<ResourceData>
