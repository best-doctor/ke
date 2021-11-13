import deepmerge from 'deepmerge'
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query'
import { MutateResourceOptions, ResourceOptionsOrKey } from '../../interfaces'
import { useConfigResolver } from '../../../hooks/useConfigResolver'
import { MutationOptions, MutationResult } from './interfaces'
import { injectInCallback } from '../../utils/injectInCallback'
import { useDefaultResourceConfig } from '../useDefaultResourceConfig'

export function useMutateResource<ResourceData, SourceData, TError = unknown, TContext = unknown>(
  userConfigOrKey: ResourceOptionsOrKey<MutateResourceOptions<ResourceData, SourceData, TError, TContext>>,
  requestOptions: MutationOptions<ResourceData, SourceData, TError, TContext> = {}
): MutationResult<ResourceData, SourceData, TError, TContext> {
  const userConfig = useConfigResolver(userConfigOrKey)
  const {
    mutate: { fn },
  } = useDefaultResourceConfig<ResourceData, SourceData>()
  const { key, ...options } = userConfig

  const { requestConfig, overrideGlobalOnError, mutationFn, ...mutationOptions } = deepmerge(options, requestOptions)
  const queryClient = useQueryClient()
  const globalOnError = queryClient.getDefaultOptions()?.mutations?.onError

  if (!!mutationOptions.onError && globalOnError && !overrideGlobalOnError) {
    mutationOptions.onError = injectInCallback(mutationOptions.onError, globalOnError)
  }

  const mutateFunction = mutationFn || ((data: SourceData) => fn(key, data, requestConfig))

  return useMutation<ResourceData, TError, SourceData, TContext>(
    mutateFunction,
    mutationOptions as UseMutationOptions<ResourceData, TError, SourceData, TContext>
  )
}
