import React, { PropsWithChildren, useEffect, useMemo } from 'react'
import { Box, Button, Flex } from '@chakra-ui/core'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { useStore } from 'effector-react'
import { useStoreState } from '@cdk/Hooks'
import { makeSlots, makeWithLayout } from '@cdk/Layouts'

const PaginationLayout = makeSlots(
  {
    ToFirst: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    ToPrev: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    Pages: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    ToNext: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    ToLast: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
  },
  (slotElements) => (
    <Flex>
      <Box flex={1}>{slotElements.ToFirst}</Box>
      <Box flex={1}>{slotElements.ToPrev}</Box>
      <Box flex={4}>{slotElements.Pages}</Box>
      <Box flex={1}>{slotElements.ToNext}</Box>
      <Box flex={1}>{slotElements.ToLast}</Box>
    </Flex>
  )
)

export const Pagination = makeWithLayout(({ value, onChange, totalCount }: PaginationProps) => {
  const paginationApi = useMemo(
    () => ({
      toFirst: () => 1,
      next: (prev: number) => prev + 1,
      prev: (prev: number) => prev - 1,
      toLast: () => totalCount,
    }),
    [totalCount]
  )

  const [$pagination, paginationEvents] = useStoreState(value, paginationApi)

  useEffect(() => {
    const subs = $pagination.watch(onChange)

    return () => subs.unsubscribe()
  }, [$pagination, onChange])

  const current = useStore($pagination)

  return {
    ToFirst: (
      <Button onClick={() => paginationEvents.toFirst()}>
        <FiChevronsLeft />
      </Button>
    ),
    ToPrev: (
      <Button onClick={() => paginationEvents.prev()}>
        <FiChevronLeft />
      </Button>
    ),
    Pages: `${current} / ${totalCount}`,
    ToNext: (
      <Button onClick={() => paginationEvents.next()}>
        <FiChevronRight />
      </Button>
    ),
    ToLast: (
      <Button onClick={() => paginationEvents.toLast()}>
        <FiChevronsRight />
      </Button>
    ),
  }
}, PaginationLayout)

interface PaginationProps {
  value: number
  onChange: (val: number) => void
  totalCount: number
}
