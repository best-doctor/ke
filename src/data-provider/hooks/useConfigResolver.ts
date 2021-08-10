import { useMemo } from 'react'
import { configResolver } from '../utils'

export function useConfigResolver<T extends { key: string }>(config: T | string): T {
  return useMemo(() => configResolver(config), [config])
}
