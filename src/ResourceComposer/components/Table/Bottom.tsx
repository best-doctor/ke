import * as React from 'react'
import { Flex, Text } from '@chakra-ui/core'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather'

import { TableIconButton } from './styles'

type BottonProps = {
  pageIndex: number
  canPreviousPage: boolean
  canNextPage: boolean
  pageOptions: Array<number>
  pageCount: number
  gotoPage: Function
  nextPage: Function
  previousPage: Function
}

const Bottom = ({
  pageIndex,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
}: BottonProps): JSX.Element => {
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
          onClick={() => gotoPage(0)}
          isDisabled={!canPreviousPage}
          icon={() => <ChevronsLeft size={20} />}
        />
        <TableIconButton
          mr={2}
          isDisabled={!canPreviousPage}
          onClick={() => previousPage()}
          icon={() => <ChevronLeft size={20} />}
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
          onClick={() => nextPage()}
          icon={() => <ChevronRight size={20} />}
        />
        <TableIconButton
          ml={2}
          onClick={() => gotoPage(pageCount ? pageCount - 1 : 1)}
          isDisabled={!canNextPage}
          icon={() => <ChevronsRight size={20} />}
        />
      </Flex>
    </Flex>
  )
}

export { Bottom }
