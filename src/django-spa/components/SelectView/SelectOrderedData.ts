import { createElement } from 'react'
import { PolymorphProps } from '@cdk/Types'

import { Order, useSelectOrder, useSelectResult } from './Contexts'

/**
 * Полиморфный компонент для подключения вывода данных к SelectView c поддержкой сортировки
 *
 * @remarks
 * Требования к компоненту вывода данных - {@link RequiredOrderedDataProps}
 */
export function SelectOrderedData<OrderedDataProps extends RequiredOrderedDataProps>({
  as: Data,
  ...dataProps
}: SelectOrderedDataProps<OrderedDataProps>): JSX.Element {
  const { result, status } = useSelectResult()
  const [order, onOrderChange] = useSelectOrder()

  return createElement(Data, ({
    data: result?.items || null,
    isLoading: status.isLoading,
    ordering: order,
    onOrderChange,
    ...dataProps,
  } as unknown) as OrderedDataProps)
}

type SelectOrderedDataProps<TargetProps extends RequiredOrderedDataProps> = PolymorphProps<
  RequiredOrderedDataProps,
  TargetProps
>

interface RequiredOrderedDataProps {
  data: unknown[] | null
  isLoading?: boolean
  ordering: Order[] | null
  onOrderChange: (orderBy: Order[]) => void
}
