import type { ResponseCache } from './interfaces'

type CachedValue = {
  value: any
  cachedTime: number
}

class LocalCache implements ResponseCache {
  cacheTime = 0

  keySpace: Record<string, CachedValue> = {}

  get(cacheKey: string, cacheTime?: number): any {
    const effectiveCacheTime = cacheTime || this.cacheTime
    if (effectiveCacheTime > 0) {
      const cached = this.keySpace[cacheKey] || undefined
      if (cached !== undefined) {
        if (cached.cachedTime + effectiveCacheTime * 1000 > Date.now()) {
          return cached.value
        }
      }
    }
    return undefined
  }

  set(cacheKey: string, value: any): void {
    this.keySpace[cacheKey] = { value, cachedTime: Date.now() }
  }
}

export { LocalCache }
