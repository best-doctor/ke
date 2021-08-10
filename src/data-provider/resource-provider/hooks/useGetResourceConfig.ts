import deepmerge from 'deepmerge'
import { useCallback } from 'react'

import { ResourceConfig, ResourceDefaultConfig, ResourceOptions } from '../interfaces'
import { useDefaultResourceConfig } from './useDefaultResourceConfig'

interface UseGetResourceConfig<ResourceData> {
  config: ResourceDefaultConfig<ResourceData>
  mergeWithDefaultConfig: (propsConfig: ResourceOptions<ResourceData>) => ResourceConfig<ResourceData>
}

export function useGetResourceConfig<ResourceData>(): UseGetResourceConfig<ResourceData> {
  const defaultConfig = useDefaultResourceConfig<ResourceData>()

  const mergeWithDefaultConfig = useCallback(
    (propsConfig: ResourceOptions<ResourceData>) =>
      deepmerge(defaultConfig, propsConfig) as ResourceConfig<ResourceData>,
    [defaultConfig]
  )

  return { config: defaultConfig, mergeWithDefaultConfig }
}
