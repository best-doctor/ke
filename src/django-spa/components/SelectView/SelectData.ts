import { createElement } from 'react'
import { PolymorphProps } from '@cdk/Types'

import { useSelectResult } from './Contexts'

/**
 * Полиморфный компонент для подключения вывода данных к SelectView
 *
 * @remarks
 * Требования к компоненту вывода данных - {@link RequiredDataProps}
 */
export function SelectData<DataProps extends RequiredDataProps>({
  as: Data,
  ...dataProps
}: SelectDataProps<DataProps>): JSX.Element {
  const { result, status } = useSelectResult()

  return createElement(Data, ({
    ...dataProps,
    data: result?.items || null,
    isLoading: status.isLoading,
  } as unknown) as DataProps)
}

type SelectDataProps<TargetProps extends RequiredDataProps> = PolymorphProps<RequiredDataProps, TargetProps>

interface RequiredDataProps {
  /** Сущности для вывода */
  data: unknown[] | null
  /** Флаг процесса загрузки сущностей */
  isLoading?: boolean
}
