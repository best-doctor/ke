import React, { useCallback, forwardRef } from 'react'
import { Box, Checkbox as ChakraCheckBox, CheckboxProps as ChakraCheckboxProps } from '@chakra-ui/react'

import { usePropState } from '@cdk/Hooks'

import { ControlProps } from '../types'

type CheckBoxProps = ControlProps<boolean> & {
  /**
    Text displayed next to checkbox
   */
  helpText?: string
} & Omit<ChakraCheckboxProps, 'value' | 'onChange'>

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>((props, ref): JSX.Element => {
  const { value: inputValue, onChange, helpText, ...rest } = props
  const [value, setValue] = usePropState(inputValue)

  const handleChange = useCallback(
    (v: boolean): void => {
      setValue(v)
      onChange(v)
    },
    [setValue, onChange]
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
