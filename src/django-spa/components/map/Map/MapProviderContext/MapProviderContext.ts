import { createContext } from 'react'

export const mapProviderContext = createContext<string | null>(null)

export const MapProviderContext = mapProviderContext.Provider
