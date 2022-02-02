import { Context, useCallback, useContext } from 'react'

import { LeafData, RootContext, Updater } from './types'

export function useLeaf(context: Context<RootContext>, key: string | number): [LeafData, (updater: Updater) => void] {
  const [getKey, updateKey] = useContext(context)

  const updateLeaf = useCallback((updater: Updater) => updateKey(key, updater), [key, updateKey])

  return [getKey(key), updateLeaf]
}
