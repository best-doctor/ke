import { useContext } from 'react'

import { mapProviderContext } from './MapProviderContext'

export function useMapProviderContext(): string | null {
  return useContext(mapProviderContext)
}
