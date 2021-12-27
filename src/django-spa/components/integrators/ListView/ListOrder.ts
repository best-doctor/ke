import { createElement } from 'react'
import { PolymorphProps } from '~types'

import { Order, useListOrder } from './Contexts'

/**
 * Полиморфный компонент для подключения отдельного компонента сортировки к ListView
 *
 * @remarks
 * Требования к компоненту сортировки - {@link RequiredOrderProps}
 */
export function ListOrder<OrderProps extends RequiredOrderProps>({
  as: Sorting,
  ...sortingProps
}: ListOrderProps<OrderProps>): JSX.Element {
  const [order, onOrderChange] = useListOrder()

  return createElement(Sorting, { ...sortingProps, value: order, onChange: onOrderChange } as unknown as OrderProps)
}

type ListOrderProps<TargetProps extends RequiredOrderProps> = PolymorphProps<RequiredOrderProps, TargetProps>

interface RequiredOrderProps {
  /** Текущее состояние сортировки */
  value: Order | null
  /** Коллбэк на изменение сортировки */
  onChange: (orderBy: Order) => void
}
