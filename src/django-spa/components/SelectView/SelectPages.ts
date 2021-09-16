import { createElement, useCallback } from 'react'
import { PolymorphProps } from '@cdk/Types'

import { useSelectPagination, useSelectResult } from './Contexts'

/**
 * Полиморфный компонент для подключения пагинации к SelectView
 *
 * @remarks
 * Требования к компоненту пагинации - {@link RequiredPaginationProps}
 */
export function SelectPages<PaginationProps extends RequiredPaginationProps>({
  as: Pagination,
  ...paginationProps
}: SelectPaginationProps<PaginationProps>): JSX.Element {
  const [{ page, perPage }, onChange] = useSelectPagination()
  const { result } = useSelectResult()
  const handleChange = useCallback((changed: number) => onChange({ page: changed, perPage }), [onChange, perPage])

  return createElement(Pagination, {
    value: page,
    totalCount: Math.ceil((result?.total ?? 0) / perPage),
    onChange: handleChange,
    ...paginationProps,
  } as unknown as PaginationProps)
}

type SelectPaginationProps<TargetProps extends RequiredPaginationProps> = PolymorphProps<
  RequiredPaginationProps,
  TargetProps
>

interface RequiredPaginationProps {
  /** Номер текущей страницы */
  value: number | null
  /** Всего страниц доступно */
  totalCount?: number | undefined
  /** Коллбэк на изменение текущей страницы */
  onChange: (page: number) => void
}
