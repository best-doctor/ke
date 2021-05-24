import { useCallback, useContext } from 'react'

import { TreeContext } from './Tree.context'
import { LeafData, LeafUpdater } from './types'

export function useLeaf(key: string | number): [LeafData, (updater: LeafUpdater) => void] {
  const [getKey, updateKey] = useContext(TreeContext)

  const updateLeaf = useCallback((updater: LeafUpdater) => updateKey(key, updater), [key, updateKey])

  return [getKey(key), updateLeaf]
}
