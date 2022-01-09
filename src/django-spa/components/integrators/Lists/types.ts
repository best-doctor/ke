import { ContextsData, ContextsRecord } from '@cdk/multiple-contexts'
import { PolymorphComponent } from '~types'

/**
 * Контекст с данными по результату запроса
 */
export interface DataContext {
  /** Массив полученных элементов для рендера */
  items: unknown[]
  /** Сколько всего элементов удовлетворяет параметрам без учёта пагинации */
  total: number
}

/**
 * Контекст с параметрами запроса и функцией их обновления
 */
export type ParamsContext = [params: Params, setParams: (p: Params) => void]

/**
 * Контекст с списком выбранных элементов из общего массива и функцией для их обновления
 */
export type SelectedContext = [selected: unknown[], setSelected: (selected: unknown[]) => void]

/**
 * Контекст с текущим статусом получения данных
 */
export interface StatusContext {
  /** Идёт получение данных с сервера */
  isLoading: boolean
  /** Данные ещё не были получены ни разу */
  isNotLoaded: boolean
}

/**
 * Параметры запроса данных
 */
export interface Params {
  /** Фильтры */
  filters: unknown
  /** Информация о сортировки */
  order: unknown
  /** Пагинация */
  pagination: PaginationValue
}

export interface PaginationValue {
  currentPage: number
  itemsPerPage: number
}

/**
 * Тип фабричной-функции для создание полиморфоных consumer-компонетов к предварително
 * определённому словарю контекстов
 */
export type ListConsumerMaker<Contexts extends ContextsRecord> = <
  K extends keyof Contexts,
  ConsumerProps = ContextsData<Pick<Contexts, K>>
>(
  keys: K[],
  proxy?: (data: ContextsData<Pick<Contexts, K>>) => ConsumerProps
) => PolymorphComponent<ConsumerProps>
