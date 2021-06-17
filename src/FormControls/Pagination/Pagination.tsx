import React, { FC, PropsWithChildren } from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather'
import { useApiState, useChangeEffect } from '@cdk/Hooks'
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
    <Flex alignItems="center" fontSize="0.875em" mt={4} mb={4}>
      <Box>{slotElements.ToFirst}</Box>
      <Box>{slotElements.ToPrev}</Box>
      <Box>{slotElements.Pages}</Box>
      <Box>{slotElements.ToNext}</Box>
      <Box>{slotElements.ToLast}</Box>
    </Flex>
  )
)

const PaginationButton = ({ disabled, onClick, element }: PaginationButtonProps): JSX.Element => (
  <Button
    as={element}
    size="xs"
    _hover={{ bg: undefined }}
    _focus={{ boxShadow: undefined }}
    disabled={disabled}
    bg={undefined}
    onClick={onClick}
  />
)

export const Pagination = makeWithLayout(({ value, onChange, totalCount }: PaginationProps) => {
  const [page, { toFirst, prev, toLast, next }] = useApiState(value, {
    toFirst: () => 1,
    next: (p: number) => (p < totalCount ? p + 1 : p),
    prev: (p: number) => (p > 1 ? p - 1 : p),
    toLast: () => totalCount,
  })
  const isFirst = page === 1
  const isLast = page === totalCount

  useChangeEffect(() => onChange(page), [page, onChange])

  return {
    ToFirst: <PaginationButton element={ChevronsLeft} disabled={isFirst} onClick={() => toFirst()} />,
    ToPrev: <PaginationButton element={ChevronLeft} disabled={isFirst} onClick={() => prev()} />,
    Pages: `${page} / ${totalCount}`,
    ToNext: <PaginationButton element={ChevronRight} disabled={isLast} onClick={() => next()} />,
    ToLast: <PaginationButton element={ChevronsRight} disabled={isLast} onClick={() => toLast()} />,
  }
}, PaginationLayout)

interface PaginationProps {
  value: number
  onChange: (val: number) => void
  totalCount: number
}

interface PaginationButtonProps {
  element: FC<unknown>
  disabled: boolean
  onClick: () => void
}
