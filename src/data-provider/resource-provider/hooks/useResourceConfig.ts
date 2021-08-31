import deepmerge from 'deepmerge'
import { useMemo } from 'react'
import { ResourceConfig, ResourceOptions } from '../interfaces'
import { useDefaultResourceConfig } from './useDefaultResourceConfig'

export function useResourceConfig<ResourceData, SourceData = ResourceData>(
  propsConfig: ResourceOptions<ResourceData, SourceData>
): ResourceConfig<ResourceData, SourceData> {
  const config = useDefaultResourceConfig<ResourceData>()
  return useMemo(
    () => deepmerge(config, propsConfig) as ResourceConfig<ResourceData, SourceData>,
    [config, propsConfig]
  )
}
