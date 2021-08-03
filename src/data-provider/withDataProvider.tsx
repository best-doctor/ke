import React, { useMemo } from 'react'
import { useQueryClient } from 'react-query'
import { useDataProvider } from './DataContext'
import { createFetchResource } from './resource-provider/FetchResource'
import { FetchResource, ResourceMutate, ResourceQuery, ResourceSourceConfig } from './resource-provider/interfaces'

export interface DataProviderConfig {
  resource?: ResourceSourceConfig | string
}

export type WithDataProviderProps<T> = DataProviderConfig & T

export interface ProviderObject<T> {
  useQuery: ResourceQuery<T>
  useMutate: ResourceMutate<T>
  fetchResource: FetchResource<T>
  fetchList: FetchResource<T>
}

function resourceConfigResolver(config: ResourceSourceConfig | string): ResourceSourceConfig {
  if (typeof config === 'string') {
    return { key: config }
  }
  return config
}

export function withDataProvider<Props>(
  Component: React.FunctionComponent<Props>
): React.ComponentType<WithDataProviderProps<Props>> {
  return (props: WithDataProviderProps<Props>): React.ReactElement | null => {
    const { mutateResource, queryResource, fetchResource: fetchFn, fetchList: fetchListFn } = useDataProvider()
    const queryClient = useQueryClient()

    const { resource } = props
    const state = useMemo(() => {
      let stateDraw: Partial<ProviderObject<unknown>> = {}
      if (resource) {
        const { key, mutate, query, fetchList, fetchResource } = resourceConfigResolver(resource)
        stateDraw = {
          ...stateDraw,
          useQuery: queryResource(key, query?.options, query?.requestFn),
          useMutate: mutateResource(key, mutate?.options, mutate?.mutateFn),
          fetchResource: createFetchResource(queryClient, fetchFn, key, fetchResource?.options),
          fetchList: createFetchResource(queryClient, fetchListFn, key, fetchList?.options),
        }
      }
      return stateDraw
    }, [fetchFn, fetchListFn, mutateResource, queryClient, queryResource, resource])
    return Component(props as Props, state)
  }
}
