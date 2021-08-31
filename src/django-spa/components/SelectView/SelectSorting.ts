import { createElement } from 'react'
import { PolymorphProps } from '@cdk/Types'

import { Order, useSelectOrder } from './Contexts'

/**
 * Полиморфный компонент для подключения отдельного компонента сортировки к SelectView
 *
 * @remarks
 * Требования к компоненту сортировки - {@link RequiredOrderProps}
 */
export function SelectSorting<OrderProps extends RequiredOrderProps>({
  as: Sorting,
  ...sortingProps
}: SelectFiltersProps<OrderProps>): JSX.Element {
  const [order, onOrderChange] = useSelectOrder()

  return createElement(Sorting, { ...sortingProps, value: order, onChange: onOrderChange } as unknown as OrderProps)
}

type SelectFiltersProps<TargetProps extends RequiredOrderProps> = PolymorphProps<RequiredOrderProps, TargetProps>

interface RequiredOrderProps {
  /** Текущее состояние сортировки */
  value: Order | null
  /** Коллбэк на изменение сортировки */
  onChange: (orderBy: Order) => void
}
