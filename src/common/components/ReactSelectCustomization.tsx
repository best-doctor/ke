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
import classNames from 'classnames'
import React from 'react'
import {
  ControlProps,
  IndicatorProps,
  components as selectComponents,
  StylesConfig,
  MultiValueProps,
  OptionTypeBase,
  SingleValueProps,
  MenuProps,
} from 'react-select'

export interface ComponentsClassNames {
  MultiValue?: string
  Input?: string
}

export interface ExtendedProps {
  componentsClasses?: ComponentsClassNames
}

export const Control = <OptionType, IsMulti extends boolean = false>({
  innerRef,
  innerProps,
  isFocused,
  isDisabled,
  children,
  getStyles,
  ...props
}: ControlProps<OptionType, IsMulti>): JSX.Element => {
  const styles = useMultiStyleConfig('SelectWidget', props)

  return (
    <StylesProvider value={styles}>
      <Flex
        data-test-id="control"
        css={getStyles('control', props)}
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

  const externalClassName = (selectProps as ExtendedProps).componentsClasses?.MultiValue

  return (
    <ClassNames>
      {({ css, cx: emotionCx }) => (
        <Tag data={data} sx={multiValueContainer} {...innerProps} className={classNames(className, externalClassName)}>
          <TagLabel data={data} sx={multiValueLabel} className={className}>
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
            isDisabled={isDisabled}
            {...removeProps}
            sx={multiValueRemove}
          />
        </Tag>
      )}
    </ClassNames>
  )
}

function Input({ className, ...props }: any): JSX.Element {
  // eslint-disable-next-line react/destructuring-assignment
  const externalClassName = (props.selectProps as ExtendedProps)?.componentsClasses?.Input
  return <selectComponents.Input {...props} className={classNames(className, externalClassName)} />
}

function Menu<OptionType, IsMulti extends boolean = false>({
  innerProps,
  ...rest
}: MenuProps<OptionType, IsMulti>): JSX.Element {
  return (
    <selectComponents.Menu
      {...rest}
      innerProps={{ ...innerProps, 'data-test-id': rest.selectProps.name?.concat('--menu') || 'menu' }}
    />
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
  control(_, state) {
    if (externalStyles?.control) {
      return externalStyles.control({}, state)
    }
    return {}
  },
})

export const components = { Control, DropdownIndicator, MultiValue, SingleValue, Input, Menu }
