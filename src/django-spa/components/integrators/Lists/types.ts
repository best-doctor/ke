import { ContextsData, ContextsRecord } from '@cdk/multiple-contexts'
import { PolymorphComponent } from '~types'

export interface DataContext {
  items: unknown[]
  total: number
}

export type ParamsContext = [params: Params, setParams: (p: Params) => void]

export type SelectedContext = [selected: unknown[], setSelected: (selected: unknown[]) => void]

export interface StatusContext {
  isLoading: boolean
  isNotLoaded: boolean
}

export interface Params {
  filters: FiltersValue
  order: OrderValue
  pagination: PaginationValue
}

export type FiltersValue = Record<string, unknown>

export type OrderValue = Record<string, Order>

export interface PaginationValue {
  currentPage: number
  itemsPerPage: number
}

export type ListConsumerMaker<Contexts extends ContextsRecord> = <
  K extends keyof Contexts,
  ConsumerProps = ContextsData<Pick<Contexts, K>>
>(
  keys: K[],
  proxy?: (data: ContextsData<Pick<Contexts, K>>) => ConsumerProps
) => PolymorphComponent<ConsumerProps>

type Order = 'asc' | 'desc' | null
