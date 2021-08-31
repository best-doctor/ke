import deepmerge from 'deepmerge'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { ResourceOptionsOrKey } from '../../interfaces'
import { useConfigResolver } from '../../../hooks/useConfigResolver'
import { useResourceConfig } from '../useResourceConfig'
import { QueryResourceOptions, ResourceQueryResult } from './interfaces'

export const useResource = <ResourceData>(
  userConfigOrKey: ResourceOptionsOrKey<ResourceData>,
  requestOptions: QueryResourceOptions<ResourceData> = {}
): ResourceQueryResult<ResourceData> => {
  const userConfig = useConfigResolver(userConfigOrKey)
  const {
    fetchResource: { fn, query = {} },
    key,
  } = useResourceConfig<ResourceData>(userConfig)

  const { requestConfig = {}, ...queryOptions } = useMemo(
    () => deepmerge(query, requestOptions),
    [query, requestOptions]
  )

  return useQuery([key, requestConfig.lookupField, requestConfig.params], () => fn(key, requestConfig), queryOptions)
}
