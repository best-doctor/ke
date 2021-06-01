import { useCallback, useContext } from 'react'

import { TreeContext } from './Tree.context'
import { LeafData, Updater } from './types'

export function useLeaf(key: string | number): [LeafData, (updater: Updater) => void] {
  const [getKey, updateKey] = useContext(TreeContext)

  const updateLeaf = useCallback((updater: Updater) => updateKey(key, updater), [key, updateKey])

  return [getKey(key), updateLeaf]
}
