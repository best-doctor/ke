import { RequestConfig } from '../request-types'

export function resovleRequestConfigAndKey(config: RequestConfig, resourceKey: string): RequestConfig {
  if (!config.url) {
    return { ...config, url: resourceKey }
  }
  return config
}
