import React, { ReactElement } from 'react'
import { IconButton } from '@chakra-ui/react'
import { ChevronsUp, ChevronsDown, Minus } from 'react-feather'

import { OrderDirection } from './types'

export function Order({ value, onChange }: OrderProps): ReactElement<OrderProps> {
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
      throw new TypeError(`Unknown order direction: ${value}. Awaiting for 'asc' | 'desc' | null`)
  }
}

interface OrderProps {
  value: OrderDirection
  onChange: (val: OrderDirection) => void
}
