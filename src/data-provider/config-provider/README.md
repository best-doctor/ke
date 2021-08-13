# Clinic Provider

Чтобы использовать глобаный конфиг, необходимо обернуть приложение в `ConfigProvider` и передать туда корневой объект конфига.

> **Внимание!** Все глобальный конфиг и настройки должны быть мемоизированы чтобы избежать лишнего обновления контекста

## Usage

### Использования конфига внутри компонента с доступом по ключу

```tsx
const globalConfig = {
  map: {
    uuid: '123',
    color: '#ffffff',
  },
}

interface MapConfig {
  uuid: string
  color: string
}

interface MyMapProps extends ConfigProps<MapConfig> {

}

const MyMap = ({config}: MyComponentProps) => {
  const mapConfig = useConfig(config)
  console.log(mapConfig) /* =>
  {
    uuid: '123',
    color: '#ffffff',
  }
  */
  ...
}

const App = () => (
  <ConfigProvider globalConfig={globalConfig}>
    <MyMap config="map"/>
  </ConfigProvider>
)
```

### Переопределение части конфига снаружи компонента

```tsx
const globalConfig = {
  map: {
    uuid: '123',
    color: '#ffffff',
  },
}

interface MapConfig {
  uuid: string
  color: string
}

interface MyMapProps extends ConfigProps<MapConfig> {
}

const MyMap = ({config}: MyComponentProps) => {
  const mapConfig = useConfig(config)
  console.log(mapConfig) /* =>
  {
    uuid: '123',
    color: '#000000',
  }
  */
  ...
}

const App = () => (
  <ConfigProvider globalConfig={globalConfig}>
    <MyMap  
      config={{
        key: 'map',
        override: {
          color: '#000000',
        },
      }}
    />
  </ConfigProvider>
)
```


### Значение по умолчанию
Если в глобальном конфиге значение не будет найдено, будет использовано значение по умолчанию

```tsx
const globalConfig = {
  map: {
    uuid: '123',
    color: '#ffffff',
  },
}

interface MapConfig {
  uuid: string
  color: string
}

interface MyMapProps extends ConfigProps<MapConfig> {
}

const MyMap = ({config}: MyComponentProps) => {
  const mapConfig = useConfig(config)
  console.log(mapConfig) /* =>
  {
    roses: 'are red'
  }
  */
  ...
}

const App = () => (
  <ConfigProvider globalConfig={globalConfig}>
    <MyMap  
      config={{
        defaultValue: {
          roses: 'are red'
        },
        key: 'supermap',
      }}
    />
  </ConfigProvider>
)
```

Но

```tsx
const globalConfig = {
  map: {
    uuid: '123',
    color: '#ffffff',
  },
}


const App = () => (
  <ConfigProvider globalConfig={globalConfig}>
    <MyMap  
      config={{
        defaultValue: {
          roses: 'are red'
        },
        key: 'map',
      }}
    />
  </ConfigProvider>
)

const MyMap = ({config}: MyComponentProps) => {
  const mapConfig = useConfig(config)
  console.log(mapConfig) /* =>
  {
    uuid: '123',
    color: '#ffffff',
  }
  */
  ...
}

```