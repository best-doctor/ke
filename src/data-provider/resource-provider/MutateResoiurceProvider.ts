import merge from 'deepmerge'
import { useMutation } from 'react-query'
import { MutateResource, MutateResourceOptions, ResourceMutate, ResourceMutateResult } from './interfaces'

export function useMutateResource<ResourceData>(
  mutateResource: MutateResource<ResourceData>,
  resourceKey: string,
  config: MutateResourceOptions<ResourceData> = {}
): ResourceMutateResult<ResourceData, unknown, void> {
  const { requestConfig = {}, ...options } = config
  return useMutation((data: any) => mutateResource(resourceKey, data, requestConfig), options)
}

export function mutateResourceProvider<ResourceData>(
  mutateResource: MutateResource<ResourceData>,
  resourceKey: string,
  externalConfig: MutateResourceOptions<ResourceData> = {}
): ResourceMutate<ResourceData, unknown, void> {
  return (config: MutateResourceOptions<ResourceData> = {}, modifyMutateResource?: MutateResource<ResourceData>) =>
    useMutateResource(mutateResource || modifyMutateResource, resourceKey, merge(externalConfig, config))
}

export type MutateResourceProvider<ResourceData = unknown> = (
  resourceKey: string,
  queryData?: MutateResourceOptions<ResourceData>,
  fetchResource?: MutateResource<ResourceData>
) => ResourceMutate<ResourceData>
