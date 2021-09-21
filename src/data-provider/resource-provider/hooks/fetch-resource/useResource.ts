import deepmerge from 'deepmerge'
import { useMemo } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { QueryResourceOptions, ResourceOptionsOrKey } from '../../interfaces'
import { useConfigResolver } from '../../../hooks/useConfigResolver'
import { useResourceConfig } from '../useResourceConfig'
import { QueryOptions, ResourceQueryResult } from './interfaces'
import { injectInCallback } from '../../utils/injectInCallback'

export const useResource = <ResourceData>(
  userConfigOrKey: ResourceOptionsOrKey<QueryResourceOptions<ResourceData>>,
  requestOptions: QueryOptions<ResourceData> = {}
): ResourceQueryResult<ResourceData> => {
  const userConfig = useConfigResolver(userConfigOrKey)
  const {
    fetchResource: { fn, query = {} },
    key,
  } = useResourceConfig<ResourceData>(userConfig)

  const {
    requestConfig = {},
    overrideGlobalOnError,
    ...queryOptions
  } = useMemo(() => deepmerge(query, requestOptions), [query, requestOptions])

  const queryClient = useQueryClient()
  const globalOnError = queryClient.getDefaultOptions()?.queries?.onError

  if (!!queryOptions.onError && globalOnError && !overrideGlobalOnError) {
    queryOptions.onError = injectInCallback(queryOptions.onError, globalOnError)
  }

  return useQuery([key, requestConfig.lookupField, requestConfig.params], () => fn(key, requestConfig), queryOptions)
}
