import axios from 'axios'

import deepmerge from 'deepmerge'
import React, { useMemo } from 'react'

import { ResourceDefaultConfig, ResourceProviderOptions } from './interfaces'
import { ResourceProviderClient } from './ResourceProviderClient'
import { getDefaultResourceConfig } from './utils/getDefaultResourceConfig'

export const ResourceConfigContext = React.createContext<ResourceDefaultConfig | null>(null)

interface ResourceConfigProviderProps {
  children?: React.ReactNode
  options?: ResourceProviderOptions
}

const defaultFunctions = getDefaultResourceConfig(axios)

export const ResourceProvider = ({ options = {}, children }: ResourceConfigProviderProps): React.ReactElement => {
  const api = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { clientConfig, ...apiFunctions } = options
    return deepmerge(defaultFunctions, apiFunctions) as ResourceDefaultConfig
  }, [options])
  return (
    <ResourceConfigContext.Provider value={api}>
      <ResourceProviderClient config={options.clientConfig}>{children}</ResourceProviderClient>
    </ResourceConfigContext.Provider>
  )
}
