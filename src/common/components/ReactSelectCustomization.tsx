import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, StylesProvider, Tag, TagCloseButton, TagLabel, useMultiStyleConfig, useStyles } from '@chakra-ui/react'
import { ClassNames } from '@emotion/react'
import React from 'react'
import {
  ControlProps,
  IndicatorProps,
  components as selectComponents,
  StylesConfig,
  MultiValueProps,
  OptionTypeBase,
} from 'react-select'

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

export function MultiValue<OptionType>(props: MultiValueProps<OptionType>): JSX.Element {
  const { children, className, cx, getStyles, innerProps, isDisabled, removeProps, data, selectProps } = props

  const { multiValueContainer, multiValueLabel, multiValueRemove } = useStyles()

  return (
    <ClassNames>
      {({ css, cx: emotionCx }) => (
        <Tag
          data={data}
          innerProps={{
            className: emotionCx(
              css(getStyles('multiValue', props)),
              cx(
                {
                  'multi-value': true,
                  'multi-value--is-disabled': isDisabled,
                },
                className
              )
            ),
            ...innerProps,
          }}
          selectProps={selectProps}
          sx={multiValueContainer}
        >
          <TagLabel
            data={data}
            innerProps={{
              className: emotionCx(
                css(getStyles('multiValueLabel', props)),
                cx(
                  {
                    'multi-value__label': true,
                  },
                  className
                )
              ),
            }}
            selectProps={selectProps}
            sx={multiValueLabel}
          >
            {children}
          </TagLabel>
          <TagCloseButton
            className={emotionCx(
              css(getStyles('multiValueRemove', props)),
              cx(
                {
                  'multi-value__remove': true,
                },
                className
              )
            )}
            {...removeProps}
            sx={multiValueRemove}
          />
        </Tag>
      )}
    </ClassNames>
  )
}

export const modifyStyles = <OptionType extends OptionTypeBase, IsMulti extends boolean>(
  externalStyles?: StylesConfig<OptionType, IsMulti>
): StylesConfig<OptionType, IsMulti> => ({
  ...externalStyles,
  valueContainer(prevStyles, state) {
    const defaultStyles: React.CSSProperties = {
      ...prevStyles,
      padding: '0, 2px',
      marginLeft: state.isMulti ? '-2px' : undefined,
    }
    if (externalStyles?.valueContainer) {
      return externalStyles.valueContainer(defaultStyles, state)
    }
    return defaultStyles
  },
})

export const components = { Control, DropdownIndicator, MultiValue }
