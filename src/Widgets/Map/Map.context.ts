import { createContext, useContext } from 'react'
import type { MapContext } from './types'

const mapContext = createContext<MapContext>({})

export const MapContextProvider = mapContext.Provider

export function useMapContext(): MapContext {
  return useContext(mapContext)
}
