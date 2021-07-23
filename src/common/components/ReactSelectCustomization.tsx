import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, StylesProvider, useMultiStyleConfig, useStyles } from '@chakra-ui/react'
import React from 'react'
import { ControlProps, IndicatorProps, components as selectComponents } from 'react-select'

export const Control = <OptionType, IsMulti extends boolean = false>({
  innerRef,
  innerProps,
  isFocused,
  isDisabled,
  children,
  ...props
}: ControlProps<OptionType, IsMulti>): JSX.Element => {
  const styles = useMultiStyleConfig('SelectWidget', props)

  return (
    <StylesProvider value={styles}>
      <Flex
        ref={innerRef}
        sx={{
          ...styles.control,
          p: 0,
          overflow: 'hidden',
        }}
        {...innerProps}
        {...(isFocused && { 'data-focus': true })}
        {...(isDisabled && { disabled: true })}
      >
        {children}
      </Flex>
    </StylesProvider>
  )
}

const DropdownIndicator = <OptionType, IsMulti extends boolean = false>(
  props: IndicatorProps<OptionType, IsMulti>
): JSX.Element => {
  const { dropdownIndicator } = useStyles()
  return (
    <selectComponents.DropdownIndicator {...props}>
      <ChevronDownIcon sx={dropdownIndicator} />
    </selectComponents.DropdownIndicator>
  )
}

export const components = { Control, DropdownIndicator }
