import deepmerge from 'deepmerge'
import { useMemo } from 'react'
import { useMutation } from 'react-query'
import { ResourceOptionsOrKey } from '../../interfaces'
import { useConfigResolver } from '../../../hooks/useConfigResolver'
import { useResourceConfig } from '../useResourceConfig'
import { MutationOptions, MutationResult } from './interfaces'

export function useMutateResource<ResourceData, SourceData>(
  userConfigOrKey: ResourceOptionsOrKey<ResourceData, SourceData>,
  requestOptions: MutationOptions<ResourceData, SourceData> = {}
): MutationResult<ResourceData, SourceData> {
  const userConfig = useConfigResolver(userConfigOrKey)

  const {
    mutate: { fn, options = {} },
    key,
  } = useResourceConfig<ResourceData, SourceData>(userConfig)

  const { requestConfig, ...mutationOptions } = useMemo(() => deepmerge(options, requestOptions), [
    options,
    requestOptions,
  ])
  return useMutation((data: SourceData) => fn(key, data, requestConfig), mutationOptions)
}
