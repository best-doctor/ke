import React, { ReactNode } from 'react'
import { Button, ButtonGroup as ButtonContainer, ButtonProps } from '@chakra-ui/react'
import stringify from 'fast-json-stable-stringify'

export function ButtonGroup<T>({ items, value, onChange }: ButtonGroupProps<T>): JSX.Element {
  return (
    <ButtonContainer spacing="1">
      {items.map(({ label, value: btnValue, styles }) => (
        <Button
          key={stringify(btnValue)}
          onClick={() => onChange(btnValue)}
          colorScheme={btnValue === value ? 'gray' : 'brand'}
          variant="outline"
          {...styles}
        >
          {label}
        </Button>
      ))}
    </ButtonContainer>
  )
}

interface ButtonGroupProps<T> {
  items: ButtonDesc<T>[]
  value: T | null
  onChange: (v: T) => void
}

export interface ButtonDesc<T> {
  label: ReactNode
  value: T
  styles?: Pick<ButtonProps, 'colorScheme' | 'variant'>
}
