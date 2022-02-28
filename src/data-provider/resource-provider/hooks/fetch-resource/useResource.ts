import deepmerge from 'deepmerge'
import { QueryKey, useQuery, useQueryClient } from 'react-query'
import { QueryResourceOptions, ResourceOptionsOrKey } from '../../interfaces'
import { useConfigResolver } from '../../../hooks/useConfigResolver'
import { QueryOptions, ResourceQueryResult } from './interfaces'
import { injectInCallback } from '../../utils/injectInCallback'
import { useDefaultResourceConfig } from '../useDefaultResourceConfig'

export const useResource = <ResourceData>(
  userConfigOrKey: ResourceOptionsOrKey<QueryResourceOptions<ResourceData>>,
  requestOptions: QueryOptions<ResourceData> = {}
): ResourceQueryResult<ResourceData> => {
  const userConfig = useConfigResolver(userConfigOrKey)
  const { key, ...options } = userConfig
  const {
    fetchResource: { fn },
  } = useDefaultResourceConfig<ResourceData>()

  const { requestConfig = {}, overrideGlobalOnError, ...queryOptions } = deepmerge(options, requestOptions)

  const queryClient = useQueryClient()
  const globalOnError = queryClient.getDefaultOptions()?.queries?.onError

  if (!!queryOptions.onError && globalOnError && !overrideGlobalOnError) {
    queryOptions.onError = injectInCallback(queryOptions.onError, globalOnError)
  }

  return useQuery(
    [key, requestConfig.lookupField, requestConfig.params] as QueryKey,
    () => fn(key, requestConfig),
    queryOptions
  )
}
