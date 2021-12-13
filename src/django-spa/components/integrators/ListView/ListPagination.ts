import { createElement, useCallback } from 'react'
import { PolymorphProps } from '@cdk/types'

import { useListPagination, useListData } from './Contexts'

/**
 * Полиморфный компонент для подключения пагинации к ListView
 *
 * @remarks
 * Требования к компоненту пагинации - {@link RequiredPaginationProps}
 */
export function ListPagination<PaginationProps extends RequiredPaginationProps>({
  as: Pagination,
  ...paginationProps
}: ListPaginationProps<PaginationProps>): JSX.Element {
  const [{ page, perPage }, onChange] = useListPagination()
  const { data } = useListData()
  const handleChange = useCallback((changed: number) => onChange({ page: changed, perPage }), [onChange, perPage])

  return createElement(Pagination, {
    value: page,
    totalCount: Math.ceil((data?.total ?? 0) / perPage),
    onChange: handleChange,
    ...paginationProps,
  } as unknown as PaginationProps)
}

type ListPaginationProps<TargetProps extends RequiredPaginationProps> = PolymorphProps<
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
