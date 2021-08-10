import axios from 'axios'

import deepmerge from 'deepmerge'
import React, { useMemo } from 'react'

import { ResourceDefaultConfig, ResourceProviderOptions } from './interfaces'
import { ResourceProviderClient } from './ResourceProviderClient'
import { getDefaultResourceConfig } from './utils/getDefaultResourceConfig'

export const ResourceConfigContext = React.createContext<ResourceDefaultConfig | null>(null)

interface ResourceConfigProviderProps {
  children?: React.ReactNode
  config?: ResourceProviderOptions
}

const defaultFunctions = getDefaultResourceConfig(axios)

export const ResourceProvider = ({ config = {}, children }: ResourceConfigProviderProps): React.ReactElement => {
  const { clientConfig, ...apiFunctions } = config

  const api = useMemo(() => deepmerge(defaultFunctions, apiFunctions) as ResourceDefaultConfig, [apiFunctions])
  return (
    <ResourceConfigContext.Provider value={api}>
      <ResourceProviderClient config={clientConfig}>{children}</ResourceProviderClient>
    </ResourceConfigContext.Provider>
  )
}
