import React, { ReactNode } from 'react'
import { Box, Center, Spacer } from '@chakra-ui/react'
import { Order } from '../../../FormControls'

export function OrderHandler({ orderDirection, onChange, headerValue }: OrderHandlerProps): JSX.Element {
  return (
    <>
      <Box pr="2">{headerValue}</Box>
      <Spacer />
      <Center>
        <Order value={orderDirection} onChange={onChange} />
      </Center>
    </>
  )
}

interface OrderHandlerProps {
  orderDirection: OrderDirection
  onChange: (newDirection: OrderDirection) => void
  headerValue: ReactNode
}

type OrderDirection = 'asc' | 'desc' | null
