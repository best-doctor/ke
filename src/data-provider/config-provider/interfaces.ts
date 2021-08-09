export type BaseConfig = Record<string, any>

type MergeConfigs<ConfigType extends BaseConfig> = (a: Partial<ConfigType>, b: Partial<ConfigType>) => ConfigType

export interface RequiredConfigOptions<ConfigType extends BaseConfig> {
  override?: Partial<ConfigType>
  mergeConfigs: MergeConfigs<ConfigType>
}

export interface GetConfigOptions<ConfigType extends BaseConfig> extends Partial<RequiredConfigOptions<ConfigType>> {}

export interface GetConfigConfig<ConfigType extends BaseConfig> {
  options?: GetConfigOptions<ConfigType>
  key: string
}

export type GetConfig = <Config extends BaseConfig>() => Config
export type GetGlobalConfig = <GlobalConfig extends BaseConfig>() => GlobalConfig
