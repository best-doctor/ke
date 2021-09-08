import React, { useCallback, forwardRef } from 'react'
import { Box, Switch as ChakraSwitch, SwitchProps as ChakraSwitchProps } from '@chakra-ui/react'

import { usePropState } from '../../../cdk/Hooks'

import { ControlProps } from '../types'

type SwitchProps = ControlProps<boolean> & {
  /**
    Text displayed next to switch
   */
  helpText?: string
} & Omit<ChakraSwitchProps, 'value' | 'onChange'>

export const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref): JSX.Element => {
  const { value: inputValue, onChange, helpText } = props
  const [value, setValue] = usePropState(inputValue)

  const handleChange = useCallback(
    (v: boolean): void => {
      setValue(v)
      onChange(v)
    },
    [setValue, onChange]
  )

  return (
    <Box>
      <ChakraSwitch isChecked={value} onChange={(e) => handleChange(e.target.checked)} ref={ref}>
        {helpText || ''}
      </ChakraSwitch>
    </Box>
  )
})
