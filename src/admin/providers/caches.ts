import type { ResponseCache } from './interfaces'

type CachedValue = {
  value: any
  cachedTime: number
}

class LocalCache implements ResponseCache {
  constructor(readonly cacheTime: number = 0) {}

  keySpace: Record<string, CachedValue> = {}

  get(cacheKey: string, cacheTime: number = this.cacheTime): any {
    if (cacheTime > 0) {
      const cached = this.keySpace[cacheKey] || undefined
      if (cached !== undefined) {
        if (cached.cachedTime + cacheTime * 1000 > Date.now()) {
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
