import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather'

import type { BaseAnalytic } from '../../../integration/analytics'

import { pushAnalytics } from '../../../integration/analytics/utils'
import { EventNameEnum, WidgetTypeEnum } from '../../../integration/analytics/firebase/enums'

import { TableIconButton } from './styles'

type BottonProps = {
  analytics: BaseAnalytic | undefined
  resourceName: string
  pageIndex: number
  canPreviousPage: boolean
  canNextPage: boolean
  pageOptions: Array<number>
  pageCount: number
  gotoPage: Function
  nextPage: Function
  previousPage: Function
}

const Bottom = (props: BottonProps): JSX.Element => {
  const {
    resourceName,
    pageIndex,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
  } = props

  return (
    <Flex
      borderTopWidth="1px"
      overflowX="hidden"
      overflowY="hidden"
      p={4}
      bg="white"
      roundedBottomLeft={4}
      roundedBottomRight={4}
      justifyContent="space-between"
      flexDirection="row"
    >
      <Flex flexDirection="row">
        <TableIconButton
          mr={2}
          onClick={() => {
            pushAnalytics({
              eventName: EventNameEnum.BUTTON_CLICK,
              widgetName: 'table_pagination_goto_first_page',
              widgetType: WidgetTypeEnum.PAGINATION,
              value: undefined,
              resource: resourceName,
              viewType: 'list_view',
              ...props,
            })
            gotoPage(0)
          }}
          isDisabled={!canPreviousPage}
          icon={<ChevronsLeft size={20} />}
        />
        <TableIconButton
          mr={2}
          isDisabled={!canPreviousPage}
          onClick={() => {
            previousPage()
            pushAnalytics({
              eventName: EventNameEnum.BUTTON_CLICK,
              widgetName: 'table_pagination_goto_previous_page',
              widgetType: WidgetTypeEnum.PAGINATION,
              value: pageIndex - 1,
              resource: resourceName,
              viewType: 'list_view',
              ...props,
            })
          }}
          icon={<ChevronLeft size={20} />}
        />
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <Text mr={4}>
          Страница{' '}
          <strong>
            {pageIndex + 1} из {pageOptions.length}
          </strong>{' '}
        </Text>
      </Flex>
      <Flex flexDirection="row">
        <TableIconButton
          ml={2}
          isDisabled={!canNextPage}
          onClick={() => {
            pushAnalytics({
              eventName: EventNameEnum.BUTTON_CLICK,
              widgetName: 'table_pagination_goto_next_page',
              widgetType: WidgetTypeEnum.PAGINATION,
              value: pageIndex + 1,
              resource: resourceName,
              viewType: 'list_view',
              ...props,
            })
            nextPage()
          }}
          icon={<ChevronRight size={20} />}
        />
        <TableIconButton
          ml={2}
          onClick={() => {
            const lastPage = pageCount ? pageCount - 1 : 1
            pushAnalytics({
              eventName: EventNameEnum.BUTTON_CLICK,
              widgetName: 'table_pagination_goto_last_page',
              widgetType: WidgetTypeEnum.PAGINATION,
              value: lastPage,
              resource: resourceName,
              viewType: 'list_view',
              ...props,
            })
            gotoPage(lastPage)
          }}
          isDisabled={!canNextPage}
          icon={<ChevronsRight size={20} />}
        />
      </Flex>
    </Flex>
  )
}

export { Bottom }
