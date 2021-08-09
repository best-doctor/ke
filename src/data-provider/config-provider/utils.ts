import { BaseConfig, GetConfigOptions, RequiredConfigOptions } from './interfaces'

export const mergeConfigs = <Config extends BaseConfig>(a: Partial<Config>, b: Partial<Config>): Config =>
  ({ ...a, ...b } as Config)

const defaultOptions = {
  mergeConfigs,
}

export function withDefaultOptions<Config extends BaseConfig>(
  options?: GetConfigOptions<Config>
): RequiredConfigOptions<Config> {
  return { ...defaultOptions, ...options }
}
