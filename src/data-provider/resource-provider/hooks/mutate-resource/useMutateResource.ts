import deepmerge from 'deepmerge'
import { useMutation, useQueryClient } from 'react-query'
import { MutateResourceOptions, ResourceOptionsOrKey } from '../../interfaces'
import { useConfigResolver } from '../../../hooks/useConfigResolver'
import { MutationOptions, MutationResult } from './interfaces'
import { injectInCallback } from '../../utils/injectInCallback'
import { useDefaultResourceConfig } from '../useDefaultResourceConfig'

export function useMutateResource<ResourceData, SourceData>(
  userConfigOrKey: ResourceOptionsOrKey<MutateResourceOptions<ResourceData, SourceData>>,
  requestOptions: MutationOptions<ResourceData, SourceData> = {}
): MutationResult<ResourceData, SourceData> {
  const userConfig = useConfigResolver(userConfigOrKey)
  const {
    mutate: { fn },
  } = useDefaultResourceConfig<ResourceData, SourceData>()
  const { key, ...options } = userConfig

  const { requestConfig, overrideGlobalOnError, ...mutationOptions } = deepmerge(options, requestOptions)
  const queryClient = useQueryClient()
  const globalOnError = queryClient.getDefaultOptions()?.mutations?.onError

  if (!!mutationOptions.onError && globalOnError && !overrideGlobalOnError) {
    mutationOptions.onError = injectInCallback(mutationOptions.onError, globalOnError)
  }

  return useMutation((data: SourceData) => fn(key, data, requestConfig), mutationOptions)
}
