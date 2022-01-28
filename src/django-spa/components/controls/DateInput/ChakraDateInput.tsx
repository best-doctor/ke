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
      <InputLeftElement
        zIndex="unset"
        fontSize="20px"
        width="44px"
        justifyContent="flex-start"
        pl="16px"
        pointerEvents="none"
      >
        <Icon as={Calendar} />
      </InputLeftElement>
      {/* Это обёртка */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Input paddingStart="44px" className={inputClassName} {...props} ref={ref} />
    </InputGroup>
  )
)
