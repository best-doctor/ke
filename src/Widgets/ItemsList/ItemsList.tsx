import React, { FC } from 'react'
import type { LayoutProps, SectionProps } from '../../cdk/Layouts'

export function ItemsList({ layout: L }: ItemsListProps): JSX.Element {
  return (
    <L>
      <L.Filters>Filters</L.Filters>
      <L.Actions>Actions</L.Actions>
      <L.Content>Table</L.Content>
      <L.BatchActions>Batch actions</L.BatchActions>
      <L.Pagination>Pagination</L.Pagination>
    </L>
  )
}

interface ItemsListProps {
  layout: ItemsListLayout
}

type ItemsListLayout = FC<LayoutProps> & {
  Filters: FC<SectionProps>
  Actions: FC<SectionProps>
  Content: FC<SectionProps>
  BatchActions: FC<SectionProps>
  Pagination: FC<SectionProps>
}
