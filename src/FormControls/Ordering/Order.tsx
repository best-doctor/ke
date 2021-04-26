import React, { ReactElement } from 'react'
import { usePropState } from '@cdk/Hooks'
import { IconButton } from '@chakra-ui/core'
import { ChevronsUp, ChevronsDown } from 'react-feather'

import { OrderDirection } from './types'

export function Order({ value, onChange }: OrderProps): ReactElement<OrderProps> {
  const [dir, setDir] = usePropState(value)

  const handleChangeDir = (changed: OrderDirection) => {
    setDir(changed)
    onChange(changed)
  }

  switch (dir) {
    case 'asc':
      return <IconButton aria-label="По возрастанию" icon={ChevronsDown} onClick={() => handleChangeDir('desc')} />
    case 'desc':
      return <IconButton aria-label="По убыванию" icon={ChevronsUp} onClick={() => handleChangeDir('asc')} />
    default:
      throw new TypeError(`Unknown order direction: ${dir}. Awaiting for 'asc' or 'desc'`)
  }
}

interface OrderProps {
  value: OrderDirection
  onChange: (val: OrderDirection) => void
}
