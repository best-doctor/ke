import React, { useCallback, forwardRef } from 'react'
import { Box, Checkbox as ChakraCheckBox, CheckboxProps as ChakraCheckboxProps } from '@chakra-ui/react'

import { ControlProps } from '../types'

type CheckBoxProps = ControlProps<boolean> & {
  /**
    Text displayed next to checkbox
   */
  helpText?: string
} & Omit<ChakraCheckboxProps, 'value' | 'onChange'>

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>((props, ref): JSX.Element => {
  const { value, onChange, helpText, ...rest } = props

  const handleChange = useCallback(
    (v: boolean): void => {
      onChange(v)
    },
    [onChange]
  )

  // Это обёртка
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Box>
      <ChakraCheckBox
        verticalAlign="middle"
        isChecked={value}
        onChange={(e) => handleChange(e.target.checked)}
        ref={ref}
        {...rest}
      >
        {helpText || ''}
      </ChakraCheckBox>
    </Box>
  )
})
