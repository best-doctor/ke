import React from 'react'
import { Box, Checkbox as ChakraCheckBox } from '@chakra-ui/react'

import { usePropState } from '@cdk/Hooks'

import { ControlProps } from '../types'

type CheckBoxProps = ControlProps<boolean> & {
  helpText?: string
}

export const CheckBox = (props: CheckBoxProps): JSX.Element => {
  const { value: inputValue, onChange, helpText } = props
  const [value, setValue] = usePropState(inputValue)

  const handleChange = (v: boolean): void => {
    setValue(v)
    onChange(v)
  }

  return (
    <Box>
      <ChakraCheckBox isChecked={value} onChange={(e) => handleChange(e.target.checked)}>
        {helpText || ''}
      </ChakraCheckBox>
    </Box>
  )
}
