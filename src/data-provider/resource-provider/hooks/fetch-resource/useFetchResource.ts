import deepmerge from 'deepmerge'
import { useCallback } from 'react'
import { useQueryClient } from 'react-query'
import { FetchResourceOptions, ResourceOptionsOrKey } from '../../interfaces'
import { configResolver } from '../../../utils'
import { FetchOptions } from './interfaces'
import { useDefaultResourceConfig } from '../useDefaultResourceConfig'

export const useFetchResource = <ResourceData = unknown>(
  userConfigOrKey: ResourceOptionsOrKey<FetchResourceOptions<ResourceData>>
): ((requestOptions?: FetchOptions<ResourceData>) => Promise<ResourceData>) => {
  const userConfig = configResolver(userConfigOrKey)
  const {
    fetchResource: { fn },
  } = useDefaultResourceConfig<ResourceData>()

  const client = useQueryClient()

  return useCallback(
    (requestOptions: FetchOptions<ResourceData> = {}) => {
      const { key, ...config } = userConfig

      const { requestConfig = {}, ...queryOptions } = deepmerge(config, requestOptions)
      return client.fetchQuery(
        [key, requestConfig.lookupField, requestConfig.params],
        () => fn(key, requestConfig),
        queryOptions
      )
    },
    [client, fn, userConfig]
  )
}
