import { useContext } from 'react'
import { TestIdContext, TestIdContextData } from '../TestIdProvider'

export function useTestIdConfig(): TestIdContextData | null {
  return useContext(TestIdContext)
}
