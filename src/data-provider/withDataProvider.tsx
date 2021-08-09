import React, { useMemo } from 'react'
import { useQueryClient } from 'react-query'
import { GetConfig, getConfig, GetConfigConfig, GetGlobalConfig, getGlobalConfig } from './config-provider'
import { useDataProvider } from './DataContext'
import { createFetchResource } from './resource-provider/FetchResource'
import { FetchResource, ResourceMutate, ResourceQuery, ResourceSourceConfig } from './resource-provider/interfaces'

export interface DataProviderConfig {
  resource?: ResourceSourceConfig | string
  config?: GetConfigConfig<any> | string
}

export type WithDataProviderProps<T> = DataProviderConfig & T

export interface ProviderObject<ResourceType> {
  useQuery: ResourceQuery<ResourceType>
  useMutate: ResourceMutate<ResourceType>
  fetchResource: FetchResource<ResourceType>
  fetchList: FetchResource<ResourceType>
  getConfig: GetConfig
  getGlobalConfig: GetGlobalConfig
}

function configResolver<T extends { key: string }>(config: T | string): T {
  if (typeof config === 'string') {
    return { key: config } as T
  }
  return config
}

export function withDataProvider<Props>(
  Component: React.FunctionComponent<Props>
): React.ComponentType<WithDataProviderProps<Props>> {
  return (props: WithDataProviderProps<Props>): React.ReactElement | null => {
    const {
      mutateResource,
      queryResource,
      fetchResource: fetchFn,
      fetchList: fetchListFn,
      globalConfig,
    } = useDataProvider()
    const queryClient = useQueryClient()

    const { resource, config } = props
    const state = useMemo(() => {
      let stateDraw: Partial<ProviderObject<unknown>> = {}
      if (resource) {
        const { key, mutate, query, fetchList, fetchResource } = configResolver(resource)

        stateDraw = {
          ...stateDraw,
          useQuery: queryResource(key, query?.options, query?.requestFn),
          useMutate: mutateResource(key, mutate?.options, mutate?.mutateFn),
          fetchResource: createFetchResource(queryClient, fetchFn, key, fetchResource?.options),
          fetchList: createFetchResource(queryClient, fetchListFn, key, fetchList?.options),
        }
      }
      if (config) {
        const { key, options } = configResolver(config)
        stateDraw = {
          ...stateDraw,
          getConfig: getConfig(globalConfig, key, options),
          getGlobalConfig: getGlobalConfig(globalConfig),
        }
      }

      return stateDraw
    }, [config, fetchFn, fetchListFn, globalConfig, mutateResource, queryClient, queryResource, resource])
    return Component(props as Props, state)
  }
}
