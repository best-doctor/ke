import deepmerge from 'deepmerge'
import { useMutation, useQueryClient } from 'react-query'
import { ResourceOptionsOrKey } from '../../interfaces'
import { useConfigResolver } from '../../../hooks/useConfigResolver'
import { useResourceConfig } from '../useResourceConfig'
import { MutationOptions, MutationResult } from './interfaces'
import { injectInCallback } from '../../utils/injectInCallback'

export function useMutateResource<ResourceData, SourceData>(
  userConfigOrKey: ResourceOptionsOrKey<ResourceData, SourceData>,
  requestOptions: MutationOptions<ResourceData, SourceData> = {}
): MutationResult<ResourceData, SourceData> {
  const userConfig = useConfigResolver(userConfigOrKey)

  const {
    mutate: { fn, options = {} },
    key,
  } = useResourceConfig<ResourceData, SourceData>(userConfig)

  const { requestConfig, overrideGlobalOnError, ...mutationOptions } = deepmerge(options, requestOptions)
  const queryClient = useQueryClient()
  const globalOnError = queryClient.getDefaultOptions()?.mutations?.onError

  if (!!mutationOptions.onError && globalOnError && !overrideGlobalOnError) {
    mutationOptions.onError = injectInCallback(mutationOptions.onError, globalOnError)
  }

  return useMutation((data: SourceData) => fn(key, data, requestConfig), mutationOptions)
}
