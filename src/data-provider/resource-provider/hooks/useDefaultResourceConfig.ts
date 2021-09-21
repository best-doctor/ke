import { useContext } from 'react'
import { ResourceDefaultConfig } from '../interfaces'
import { ResourceConfigContext } from '../ResourceProvider'

export function useDefaultResourceConfig<ResourceData, SourceData = ResourceData>(): ResourceDefaultConfig<
  ResourceData,
  SourceData
> {
  const config = useContext(ResourceConfigContext) as ResourceDefaultConfig<ResourceData, SourceData> | null
  if (!config) {
    throw new Error('You must wrap your app with DataProvider before using useResourceProviderConfig')
  }

  return config
}
