import React from 'react'
import BaseSelect, { OptionTypeBase, Props } from 'react-select'
import { components, modifyStyles } from './ReactSelectCustomization'

export const Select = <
  OptionType extends OptionTypeBase = { label: string; value: string },
  IsMulti extends boolean = false
>({
  components: externalComponents,
  styles,
  ...props
}: Props<OptionType, IsMulti>): JSX.Element => (
  <BaseSelect components={{ ...components, ...externalComponents }} styles={modifyStyles(styles)} {...props} />
)
