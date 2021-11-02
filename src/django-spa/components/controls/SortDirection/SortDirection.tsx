import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { ChevronsUp, ChevronsDown, Minus } from 'react-feather'

export function SortDirection({ value, onChange }: OrderProps): JSX.Element {
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

export interface OrderProps {
  value: Direction
  onChange: (val: Direction) => void
}

export type Direction = 'asc' | 'desc' | null
