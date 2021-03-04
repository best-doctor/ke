import React, { Children } from 'react'
import { Box } from '@chakra-ui/core'
import type { LayoutProps, SectionProps } from './types'

export function ItemsListLayout({ children }: LayoutProps): JSX.Element {
  let filtersChild = null
  let actionsChild = null
  let contentChild = null
  let batchActionsChild = null
  let paginationChild = null

  Children.forEach(children, (child) => {
    if (!child || typeof child !== 'object' || !('type' in child)) {
      throw TypeError(`Unacceptable child '${JSON.stringify(child)}' for ItemsListLayout`)
    }

    switch (child.type) {
      case ItemsListLayout.Filters:
        filtersChild = child
        break
      case ItemsListLayout.Actions:
        actionsChild = child
        break
      case ItemsListLayout.Content:
        contentChild = child
        break
      case ItemsListLayout.BatchActions:
        batchActionsChild = child
        break
      case ItemsListLayout.Pagination:
        paginationChild = child
        break
      default:
        throw new TypeError(`Unrecognized section type "${JSON.stringify(child.type)}" for ItemsListLayout`)
    }
  })

  return (
    <Box>
      <Box>{filtersChild}</Box>
      <Box>{actionsChild}</Box>
      <Box>{contentChild}</Box>
      <Box>{batchActionsChild}</Box>
      <Box>{paginationChild}</Box>
    </Box>
  )
}

ItemsListLayout.Filters = makeSection()
ItemsListLayout.Actions = makeSection()
ItemsListLayout.Content = makeSection()
ItemsListLayout.BatchActions = makeSection()
ItemsListLayout.Pagination = makeSection()

function makeSection(): (props: SectionProps) => JSX.Element {
  return ({ children }: SectionProps): JSX.Element => {
    return <>{children}</>
  }
}
