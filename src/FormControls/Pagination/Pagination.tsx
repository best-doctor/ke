// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Box, ButtonProps, Button, Flex } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather'
import { makeSlots, makeWithLayout } from '@cdk/layouts'

const PaginationLayout = makeSlots<'ToFirst' | 'ToPrev' | 'Pages' | 'ToNext' | 'ToLast'>((slotElements) => (
  <Flex aria-label="Пагинация" alignItems="center" fontSize="0.875em" mt={4} mb={4}>
    <Box>{slotElements.ToFirst}</Box>
    <Box>{slotElements.ToPrev}</Box>
    <Box>{slotElements.Pages}</Box>
    <Box>{slotElements.ToNext}</Box>
    <Box>{slotElements.ToLast}</Box>
  </Flex>
))

const PaginationButton = ({ disabled, onClick, ...rest }: PaginationButtonProps): JSX.Element => (
  <Button
    size="xs"
    _hover={{ bg: undefined }}
    _focus={{ boxShadow: undefined }}
    disabled={disabled}
    bg="transparent"
    onClick={onClick}
    {...rest}
  />
)

export const Pagination = makeWithLayout(({ value: page, onChange, totalCount }: PaginationProps) => {
  const isFirst = page === 1
  const isLast = page === totalCount

  return {
    ToFirst: (
      <PaginationButton
        aria-label="На первую страницу"
        disabled={isFirst || totalCount === 0}
        onClick={() => onChange(1)}
      >
        <ChevronsLeft />
      </PaginationButton>
    ),
    ToPrev: (
      <PaginationButton
        aria-label="На предыдущую страницу"
        disabled={isFirst || totalCount === 0}
        onClick={() => onChange(page > 1 ? page - 1 : 1)}
      >
        <ChevronLeft />
      </PaginationButton>
    ),
    Pages: `${page} / ${totalCount}`,
    ToNext: (
      <PaginationButton
        aria-label="На следующую страницу"
        disabled={isLast || totalCount === 0}
        onClick={() => onChange(page < totalCount ? page + 1 : page)}
      >
        <ChevronRight />
      </PaginationButton>
    ),
    ToLast: (
      <PaginationButton
        aria-label="На последнюю страницу"
        disabled={isLast || totalCount === 0}
        onClick={() => onChange(totalCount)}
      >
        <ChevronsRight />
      </PaginationButton>
    ),
  }
}, PaginationLayout)

export interface PaginationProps {
  value: number
  onChange: (val: number) => void
  totalCount: number
  pending: boolean
}

interface PaginationButtonProps extends Omit<ButtonProps, 'disabled' | 'onClick'> {
  disabled: boolean
  onClick: () => void
}
