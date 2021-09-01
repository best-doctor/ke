import React, { FC } from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather'
import { makeSlots, makeWithLayout } from '@cdk/Layouts'

const PaginationLayout = makeSlots<'ToFirst' | 'ToPrev' | 'Pages' | 'ToNext' | 'ToLast'>((slotElements) => (
  <Flex alignItems="center" fontSize="0.875em" mt={4} mb={4}>
    <Box>{slotElements.ToFirst}</Box>
    <Box>{slotElements.ToPrev}</Box>
    <Box>{slotElements.Pages}</Box>
    <Box>{slotElements.ToNext}</Box>
    <Box>{slotElements.ToLast}</Box>
  </Flex>
))

const PaginationButton = ({ disabled, onClick, element }: PaginationButtonProps): JSX.Element => (
  <Button
    as={element}
    size="xs"
    _hover={{ bg: undefined }}
    _focus={{ boxShadow: undefined }}
    disabled={disabled}
    bg="transparent"
    onClick={onClick}
  />
)

export const Pagination = makeWithLayout(({ value: page, onChange, totalCount }: PaginationProps) => {
  const isFirst = page === 1
  const isLast = page === totalCount

  return {
    ToFirst: <PaginationButton element={ChevronsLeft} disabled={isFirst} onClick={() => onChange(1)} />,
    ToPrev: (
      <PaginationButton element={ChevronLeft} disabled={isFirst} onClick={() => onChange(page > 1 ? page - 1 : 1)} />
    ),
    Pages: `${page} / ${totalCount}`,
    ToNext: (
      <PaginationButton
        element={ChevronRight}
        disabled={isLast}
        onClick={() => onChange(page < totalCount ? page + 1 : page)}
      />
    ),
    ToLast: <PaginationButton element={ChevronsRight} disabled={isLast} onClick={() => onChange(totalCount)} />,
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
