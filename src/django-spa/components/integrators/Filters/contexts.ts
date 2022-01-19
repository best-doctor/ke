import { createContext } from 'react'
import { FiltersContext } from '@components/integrators/Filters/types'

export const filtersContext = createContext<FiltersContext>([undefined, () => undefined])
