import { createElement } from 'react'
import { PolymorphProps } from '@cdk/types'

import { useListData } from './Contexts'

/**
 * Полиморфный компонент для подключения вывода данных к ListView
 *
 * @remarks
 * Требования к компоненту вывода данных - {@link RequiredDataProps}
 */
export function ListData<DataProps extends RequiredDataProps>({
  as: Data,
  ...dataProps
}: ListDataProps<DataProps>): JSX.Element {
  const { data, status } = useListData()

  return createElement(Data, {
    ...dataProps,
    data: data?.items || null,
    isLoading: status.isLoading,
  } as unknown as DataProps)
}

type ListDataProps<TargetProps extends RequiredDataProps> = PolymorphProps<RequiredDataProps, TargetProps>

interface RequiredDataProps {
  /** Сущности для вывода */
  data: unknown[] | null
  /** Флаг процесса загрузки сущностей */
  isLoading?: boolean
}
