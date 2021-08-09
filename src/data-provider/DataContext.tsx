import { partial } from '@utils/Funcs'
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import deepmerge from 'deepmerge'
import React, { useContext, useMemo } from 'react'
import { BaseConfig } from './config-provider'

import {
  FetchResourceByKey,
  GetResourceProvider,
  MutateResourceProvider,
  mutateResourceProvider,
  queryResourceProvider,
  ResourceProviderClient,
  ResourceProviderConfig,
  ListResponse,
} from './resource-provider'

export interface DataProviderValue {
  queryResource: GetResourceProvider
  mutateResource: MutateResourceProvider
  fetchResource: FetchResourceByKey<unknown>
  fetchList: FetchResourceByKey<unknown>

  globalConfig: BaseConfig
}

export const DataContext = React.createContext<DataProviderValue | null>(null)

interface DataProviderProps<GlobalConfig extends BaseConfig> {
  children: React.ReactNode
  resourcesConfig?: Partial<ResourceProviderConfig>
  globalConfig?: GlobalConfig
}

function concat(base: string, lookupField?: string | number): string {
  let url = base
  if (!base.endsWith('/')) {
    url = base.concat('/')
  }
  if (typeof lookupField !== 'undefined') {
    let param = lookupField.toString()
    if (param.startsWith('/')) {
      param = param.slice(1)
    }
    url = url.concat(param)
  }
  return url
}

export function getDefaultResourceConfig(client: AxiosInstance = axios): Partial<ResourceProviderConfig> {
  return {
    fetchResource: (resourceKey, { lookupField, ...resourceConfig } = { method: 'GET' }) =>
      client(concat(resourceKey, lookupField), resourceConfig),
    fetchList: (resourceKey, { lookupField, ...resourceConfig } = { method: 'GET' }) =>
      client(concat(resourceKey, lookupField), resourceConfig).then(
        ({ data: { data } }: AxiosResponse<ListResponse<unknown>>) => data
      ),
    mutateResource: (resourceKey, data, { lookupField, ...resourceConfig } = {}) =>
      client(concat(resourceKey, lookupField), { ...resourceConfig, data }),
  }
}

export const DataProvider = <GlobalConfig extends BaseConfig>({
  children,
  resourcesConfig = {},
  globalConfig = {} as GlobalConfig,
}: DataProviderProps<GlobalConfig>): JSX.Element => {
  const value: DataProviderValue = useMemo(() => {
    const mergedResourcesConfig = deepmerge<ResourceProviderConfig>(getDefaultResourceConfig(axios), resourcesConfig)
    return {
      queryResource: partial(queryResourceProvider, mergedResourcesConfig.fetchResource),
      mutateResource: partial(mutateResourceProvider, mergedResourcesConfig.mutateResource),
      fetchResource: mergedResourcesConfig.fetchResource,
      fetchList: mergedResourcesConfig.fetchList,
      globalConfig,
    }
  }, [globalConfig, resourcesConfig])

  return (
    <ResourceProviderClient config={resourcesConfig?.clientConfig}>
      <DataContext.Provider value={value}>{children}</DataContext.Provider>
    </ResourceProviderClient>
  )
}

export function useDataProvider(): DataProviderValue {
  const value = useContext(DataContext)
  if (!value) {
    throw new Error('Wrap your tree with DataProvider')
  }
  return value
}
