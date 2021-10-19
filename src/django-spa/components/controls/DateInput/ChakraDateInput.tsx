import { Calendar } from '@bestdoctor/icons'
import { Icon, Input, InputGroup, InputLeftElement, InputProps } from '@chakra-ui/react'
import React, { forwardRef } from 'react'

interface ChakraDateInputProps extends InputProps {
  className?: string
  inputClassName?: string
}

export const ChakraDateInput = forwardRef<HTMLInputElement, ChakraDateInputProps>(
  ({ className, inputClassName, ...props }, ref) => (
    <InputGroup className={className}>
      <InputLeftElement pointerEvents="none">
        <Icon as={Calendar} />
      </InputLeftElement>
      <Input className={inputClassName} {...props} ref={ref} />
    </InputGroup>
  )
)
