export type BaseConfig = Record<string, any>

export type MergeConfigs<ConfigType extends BaseConfig> = (a: Partial<ConfigType>, b: Partial<ConfigType>) => ConfigType
export interface ConfigProcessorConfig<Config extends BaseConfig> {
  mergeConfigs: MergeConfigs<Config>
}

export interface ConfigConsumerConfig<Config extends BaseConfig> extends ConfigProcessorConfig<Config> {
  key: string
  defaultConfig?: Config
  override?: Partial<Config>
}

export interface ConfigConsumerOptions<Config extends BaseConfig> extends Partial<ConfigProcessorConfig<Config>> {
  key: string
  defaultConfig?: Config
  override?: Partial<Config>
}

export type ConfigConsumerOptionsOrKey<Config extends BaseConfig> = ConfigConsumerOptions<Config> | string

export interface ConfigProviderOptions<Config extends BaseConfig> extends Partial<ConfigProcessorConfig<Config>> {}

export interface ConfigProps<Config extends BaseConfig = any> {
  config: ConfigConsumerOptionsOrKey<Config>
}
