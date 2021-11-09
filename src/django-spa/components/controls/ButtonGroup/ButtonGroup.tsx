import React, { ReactNode } from 'react'
import { Button, ButtonGroup as ButtonContainer, ButtonProps } from '@chakra-ui/react'

export function ButtonGroup<T>({ items, value, onChange }: ButtonGroupProps<T>): JSX.Element {
  // Считаем массив крайне-редко изменяемым, а потому использование индекса допустимо
  /* eslint-disable react/no-array-index-key */
  return (
    <ButtonContainer spacing="1">
      {items.map(({ label, value: btnValue, styles }, index) => (
        <Button
          key={index}
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
  /* eslint-enable react/no-array-index-key */
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
