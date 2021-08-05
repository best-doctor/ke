/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-underscore-dangle */
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  css as chakraCss,
  Flex,
  StylesProvider,
  Tag,
  TagCloseButton,
  TagLabel,
  useMultiStyleConfig,
  useStyles,
  useTheme,
} from '@chakra-ui/react'
import { ClassNames, CSSObject } from '@emotion/react'
import React from 'react'
import {
  ControlProps,
  IndicatorProps,
  components as selectComponents,
  StylesConfig,
  MultiValueProps,
  OptionTypeBase,
  SingleValueProps,
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

function SingleValue<OptionType>({ ...props }: SingleValueProps<OptionType>): JSX.Element {
  const { singleValue } = useStyles()
  const { className, isDisabled } = props
  const theme = useTheme()
  return (
    <ClassNames>
      {({ cx: emotionCx, css }) => (
        <selectComponents.SingleValue
          {...props}
          className={emotionCx(className, {
            [css(chakraCss((singleValue as any)?._disabled)(theme))]: isDisabled,
          })}
        />
      )}
    </ClassNames>
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
    const defaultStyles: CSSObject = {
      ...prevStyles,
      padding: '2px 0',
      marginLeft: state.isMulti ? '-2px' : undefined,
    }
    if (externalStyles?.valueContainer) {
      return externalStyles.valueContainer(defaultStyles, state)
    }
    return defaultStyles
  },
})

export const components = { Control, DropdownIndicator, MultiValue, SingleValue }
