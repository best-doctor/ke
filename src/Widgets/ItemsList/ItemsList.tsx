import React, { FC, PropsWithChildren } from 'react'
import { LayoutProps, SectionProps, HorizontalList } from '@cdk/Layouts'

import { Filters, Filter, FiltersValue } from '../Filters'

export function ItemsList<F extends string>({
  layout: L,
  filters,
  filtersValue,
  children,
}: ItemsListProps<F>): JSX.Element {
  return (
    <L>
      <L.Filters>
        <Filters filters={filters} value={filtersValue} onChange={() => {}} layout={HorizontalList} />
      </L.Filters>
      <L.Actions>Actions</L.Actions>
      <L.Content>{children}</L.Content>
      <L.BatchActions>Batch actions</L.BatchActions>
      <L.Pagination>Pagination</L.Pagination>
    </L>
  )
}

type ItemsListProps<F extends string> = PropsWithChildren<{
  filters: Filter<F>[]
  filtersValue: FiltersValue<F>
  layout: ItemsListLayout
}>

type ItemsListLayout = FC<LayoutProps> & {
  Filters: FC<SectionProps>
  Actions: FC<SectionProps>
  Content: FC<SectionProps>
  BatchActions: FC<SectionProps>
  Pagination: FC<SectionProps>
}
