import { createElement } from 'react'
import { PolymorphProps } from '@cdk/types'

import { Order, useListOrder, useListData } from './Contexts'

/**
 * Полиморфный компонент для подключения вывода данных к ListView c поддержкой сортировки
 *
 * @remarks
 * Требования к компоненту вывода данных - {@link RequiredOrderedDataProps}
 */
export function ListOrderedData<OrderedDataProps extends RequiredOrderedDataProps>({
  as: Data,
  ...dataProps
}: ListOrderedDataProps<OrderedDataProps>): JSX.Element {
  const { data, status } = useListData()
  const [order, onOrderChange] = useListOrder()

  return createElement(Data, {
    data: data?.items || null,
    isLoading: status.isLoading,
    ordering: order,
    onOrderChange,
    ...dataProps,
  } as unknown as OrderedDataProps)
}

type ListOrderedDataProps<TargetProps extends RequiredOrderedDataProps> = PolymorphProps<
  RequiredOrderedDataProps,
  TargetProps
>

interface RequiredOrderedDataProps {
  data: unknown[] | null
  isLoading?: boolean
  ordering: Order[] | null
  onOrderChange: (orderBy: Order[]) => void
}
