import React, { ReactNode } from 'react'
import { Box, Center, Flex, IconButton, Spacer } from '@chakra-ui/react'
import { ChevronsDown, ChevronsUp, Minus } from 'react-feather'

export function SortHandler({ orderDirection, onChange, headerValue }: SortHandlerProps): JSX.Element {
  return (
    <Flex>
      <Box pr="2">{headerValue}</Box>
      <Spacer />
      <Center>
        <SortDirection value={orderDirection} onChange={onChange} />
      </Center>
    </Flex>
  )
}

interface SortHandlerProps {
  orderDirection: Direction
  onChange: (newDirection: Direction) => void
  headerValue: ReactNode
}

function SortDirection({ value, onChange }: SortDirectionProps): JSX.Element {
  switch (value) {
    case 'asc':
      return (
        <IconButton
          background={{}}
          aria-label="По возрастанию"
          icon={<ChevronsDown />}
          onClick={() => onChange('desc')}
          size="xs"
        />
      )
    case 'desc':
      return (
        <IconButton
          background={{}}
          aria-label="По убыванию"
          icon={<ChevronsUp />}
          onClick={() => onChange(null)}
          size="xs"
        />
      )
    case null:
      return (
        <IconButton
          background={{}}
          aria-label="Сортировать"
          icon={<Minus />}
          onClick={() => onChange('asc')}
          size="xs"
        />
      )
    default:
      throw new TypeError(`Unknown sort direction: ${value}. Awaiting for 'asc' | 'desc' | null`)
  }
}

interface SortDirectionProps {
  value: Direction
  onChange: (val: Direction) => void
}

type Direction = 'asc' | 'desc' | null
