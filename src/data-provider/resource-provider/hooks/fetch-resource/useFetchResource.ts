import deepmerge from 'deepmerge'
import { useCallback } from 'react'
import { useQueryClient } from 'react-query'
import { ResourceOptionsOrKey } from '../../interfaces'
import { configResolver } from '../../../utils'
import { useGetResourceConfig } from '../useGetResourceConfig'
import { FetchOptions } from './interfaces'

export const useFetchResource = <ResourceData = unknown>(
  userConfigOrKey: ResourceOptionsOrKey<ResourceData>
): ((requestOptions?: FetchOptions<ResourceData>) => Promise<ResourceData>) => {
  const userConfig = configResolver(userConfigOrKey)
  const { mergeWithDefaultConfig } = useGetResourceConfig<ResourceData>()

  const client = useQueryClient()

  return useCallback(
    (requestOptions: FetchOptions<ResourceData> = {}) => {
      const {
        key,
        fetchResource: { fn, fetch = {} },
      } = mergeWithDefaultConfig(userConfig)

      const { requestConfig, ...queryOptions } = deepmerge(fetch, requestOptions)
      return client.fetchQuery(
        [key, requestConfig.lookupField, requestConfig.params],
        () => fn(key, requestConfig),
        queryOptions
      )
    },
    [client, mergeWithDefaultConfig, userConfig]
  )
}
