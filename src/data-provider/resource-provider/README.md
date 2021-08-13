# Resource Provider

Адаптер [react-query](https://react-query.tanstack.com/) под нужды проекта.
Для начала очень рекомендую ознакомиться с документацией. Как минимум с:
1. [Queries](https://react-query.tanstack.com/guides/queries)
1. [Query Keys](https://react-query.tanstack.com/guides/query-keys)
1. [Mutations](https://react-query.tanstack.com/guides/mutations)
1. [Query Invalidation](https://react-query.tanstack.com/guides/query-invalidation)


## Зачем react-query
ReactQuery решает задачи:
1. Кеширования денормализованных данных от сервера. По умолчанию он работает по схеме:
   * сделать запрос на сервер
   * отдать данные из кеша, если есть
   * обновить данные в кеше
1. Позволяет избегать нескольких одинаковых параллельных запросов
1. Позволяет гибко настраивать когда именно нужно фетчить данные.
Что дает избежать лишних запросов при ререндере.
1. Позволяет не писать состояние запросов в т.ч. `isLoading`, `isSuccess`, `isError`
1. Позволяет делать [Optimistic Updates](https://react-query.tanstack.com/guides/optimistic-updates)

Чтобы понимать всю его силу, лучше ознакомиться с докой

 
## Ключи кеширования

Все данные с сервера не нормализованно хранятся на клиенте по уникальному ключу. Ключ формируется так:

```
[resource-key, lookupField, searchParamsObject]
```

Все части ключа должны быть сериализуемыми.
Важно понимать, что ключ должен быть составной чтобы иметь возможность гибко инвалидировать данные. Например мы зафетчили список клиник

```
[/clinics, null, { page: 1 }]
```

Потом зашли на деталку клиники и зафетчили ее

```
[/clinics, 1]
```

Обновили данные клиники и хотим инвалидировать кеш. Инвалидация кеша происходит по ключу
и нам достаточно сделать так

```typescript
queryClient.invalidateQueries(['/clinics'])
```

Такой запрос заафектит кеш со всеми ключами, начинающимися на `/clinics`. Т.е.


```
[/clinics, null, { page: 1 }]
[/clinics, 1]
```

## Конфигурация

Использовать хуки resource-provider можно двумя способами:
1. С конфигурацией вне компонента
1. С конфигурацией в компоненте
Все хуки, имеют похожую схему конфигурации. Рассмотрим конфигурацию на примере хука `useResource`

### useResource с конфигурацией вне компонента

```tsx
interface ClinicDetailProps extends ResourceProps<ListResponse<ClinicObject>> {
}

function ClinicDetail ({ resource }: ClinicDetailProps) {
  const { data, isLoading } = useResource<ListResponse<ClinicObject>>(resource)

  return (
    <Box>
      {isLoading && 'Loading...'}
      {data?.data.map(clinic => <Text key={clinic.uuid}>{clinic.title}</Text>)}
      
    </Box>
  )
}

const App = () => {
  <ClinicDetail resource={getResourceUrl(ResourceEnum.CLINICS)}/>
}

```

Сейчас хук конфигурируется единственным параметром - resourceKey. Одновременно resourceKey выступает и URL для запроса. Интерфейс `ClinicDetailProps` наследует `ResourceProps`, что
добавляет компоненту `ClinicDetail` проп `resource`. Туда можно передать объект конфигурации: `ResourceOptions` или ключ ресурса в виде строки.

Допустим мы хотим передать search params в запрос. Это можно сделать из трех мест

1. Глобальный конфиг `ResourceProvider`
1. Снаружи компонента через проп `resource` передать `ResourceOptions`
1. Внутри компонента, вторым аргуметом хука передать `*ResourceOptions`

> *ResourceOptions подразумевает подмножество типов опций. Т.е. для каждого
хука есть свой собственный тип конфигурации. Например хук мутаций `useMutateResource` конфигурируется с помощью объекта `MutationOptions`, а
`useResource` с помощью `QueryResourceOptions`. При этом снаружи (через проп `resource`) и тот и тот хук конфигурируется с помощью объекта `ResourceOptions`, потому что он может содержать в себе конфиги для разных типов хуков.

Список точек конфигурации имеет неслучайный порядок. Менее специфичный конфиг, например Глобальный, будет переопределен настройками более специфичного, например полем `resource`.

**Мерж конфигов (например глобальнго с полем `resource`) происходит с помощью deep-merge!!!** Это важно учитывать при конфигурировании чтобы не
нарваться на странные баги.

Добавим search param снаружи компонента.

```tsx
const App = () => {
  <ResourceProvider>
    <ClinicDetail resource={{
      key: getResourceUrl(ResourceEnum.CLINICS),
      fetchResource: {
        query: {
          requestConfig: {
            params: {
              programId: user?.program?.uuid
            }
          }
        }
      }
    }}/>
  </ResourceProvider>
}
```

### Конфигурация ресурса вне компонента и `ResourceOptions`

> **Внимание!** API поля `resource` не устоялся и возможно будет меняться, 
в зависимости от фидбека по результатам тестирования. Фидбек очень приветствуется.



```typescript
export interface RequestConfig extends AxiosRequestConfig {
  lookupField?: string | number
}

function getResourceoptions<ResourceData, SourceData>() {
  key: string,
  fetchResource: {
    fn?: (resourceKey: string, requestConfig?: RequestConfig, pageParams?: any) => Promise<ResourceData>,
    //Конфигурация для query хука. Т.е. для хука который
    //сам фетчит данные. Например useResource
    query?: {
      //AxiosConfig, расширенный полем lookupField
      requestConfig?: {
        //...axiosRequestConfig
        //RequestConfig
        //lookupField,
      },
      //...useQueryConfig,
      //опции для useQuery хука. О них стоит почитать на сайте react-query
      //UseQueryOptions<ResourceData>
    },
    //Аналогичная конфигурация для хука, предоставляющего fetch функцию. 
    //Т.е. сама функция не фетчит данные от вызова хука. Ее нужно явно вызвать и она вернет Promise с результатом
    fetch?: {
      requestConfig?: {
        //RequestConfig
        //lookupField,
        //...axiosRequestConfig
      },
      //FetchQueryOptions<ResourceData>
      //...fetchQueryOptions,
    }
  },
  /*
    Конфигурация для хука useMutateResource (useMutation), который
    используется обновления данных на сервере
  */
  mutate?: {
    fn: (resourceKey: string, data?: SourceData, requestConfig?: RequestConfig) => Promise<ResourceData>,
    options?: {
      requestConfig?: {
      //RequestConfig
      //lookupField,
      //...axiosRequestConfig
    },
    //...QueryMutationOptions,
  },
}
```

> Если у вас есть идеи как лучше описать структуру данного конфига,
любые предложения приветствуются

В данном объекте конфигурируются сразу все хуки, каждый хук берет из конфига лишь необходимое поле, мержит его с менее специфичными конфигами и использует.

`ResourceProvider` имеет настройки по-умолчанию. Их предоставляет `utils/getDefaultResourceConfig.ts`. По умолчанию для всех хуков должна быть функция фетча. Все остальные настройки не обязательны.

### HttpClient

Внутри всех fetch функций можно переопределить `httpClient` таким образом

```tsx
const defaultConfig = getDefaultResourceConfig(myCustomHttpClient)

const App = () => {
   <ResourceProvider options={defaultResourceConfig}>
   </ResourceProvider>
}
```

> **Внимание!** Все глобальные настройки должны быть мемоизированы чтобы избежать лишнего обновления контекста

Также глобально можно переопределить все настройки, сходящие в `ResourceOptions`



## Хуки и примеры использования

### useResource

Автоматически управляет фетчем данных. Возвращает данные

```tsx
interface ClinicDetailProps extends ResourceProps<ListResponse<ClinicObject>> {
}

function ClinicDetail ({ resource }: ClinicDetailProps) {
  const { data, isLoading } = useResource<ListResponse<ClinicObject>>(resource)

  return (
    <Box>
      {isLoading && 'Loading...'}
      {data?.data.map(clinic => <Text key={clinic.uuid}>{clinic.title}</Text>)}
      
    </Box>
  )
}

const App = () => {
  <ClinicDetail resource={getResourceUrl(ResourceEnum.CLINICS)}/>
}

```


### useFetchResource

Возвращает fetch функцию для получения данных. В отличие от обычной
fetch функции, читает / сохраняет данные из / в кеша

```tsx
export interface StatefullAsyncSelecProps extends SelectProps,
    ResourceProps<ListResponse<OptionType>> {}

export const StatefullAsyncSelect = ({
  resource,
  ...props
}: StatefullAsyncSelecProps<OptionType, number>): React.ReactElement => {
  const fetchResource = useFetchResource<ListResponse<OptionType>>(resource)

  const handleLoadOptoins: LoadOptions<OptionType, number> = useCallback(
    async (search: string, _, page = 0) => {
      const data = await fetchResource({
        requestConfig: {
          params: {
            search,
            page,
          },
        },
      })

      return {
        hasMore: !!data.meta?.next_url,
        options: data.data,
        additional: data.meta.page + 1,
      }
    },
    [fetchResource]
  )

  return (
    <AsyncPaginate
      {...(props as any)}
      loadOptions={handleLoadOptoins}
    />
  )
}

const App = () => {
  <ClinicDetail resource={getResourceUrl(ResourceEnum.CLINICS)}/>
}

```


### useMutateResource

Функции для обновления данных

```tsx
interface ClinicTitleSourceData {
  title: string
}

interface ClinicDetailProps extends ResourceProps<ClinicObject, ClinicTitleSourceData> {}

const ClinicDetail: React.FC<ClinicDetailProps> = ({ resource }) => {
  const { data, isLoading: isLoadingClinic } = useResource(resource)

  const clinet = useQueryClient()

  const { key } = useConfigResolver(resource)

  const { mutate, isLoading: isMutatatingClinic } = useMutateResource(resource, {
    onSuccess() {
      clinet.invalidateQueries([key])
    },
  })


  return (
    <Box>
      {isLoadingClinic && 'Loading...'}
      {isMutatatingClinic && 'Updating...'}
      {data && <Text>{data.title}</Text>}
      <Button
        onClick={() => {
          if (data) {
            mutate({ title: 'test-peretest' })
          }
        }}
      >
        Update
      </Button>
    </Box>
  )
}

const App = () => {
  const id = useClinicId();
  return (
    <ClinicDetail
      resource={{
        key: getResourceUrl(ResourceEnum.CLINICS),
        fetchResource: {
          query: {
            enabled: id !== undefined,
            requestConfig: {
              lookupField: id,
            },
          },
        },
        mutateResource: {
          options: {
            requestConfig: {
              method: 'PATCH'
            }
          }
        }
      }}
    />
  )
}

```