import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ChipInput } from './ChipInput'
import { ThemeProvider } from '../../../styles'

export default {
  title: 'Components/ChipInput',
  component: ChipInput,
} as ComponentMeta<typeof ChipInput>

const Template: ComponentStory<typeof ChipInput> = (args) => (
  <ThemeProvider>
    <ChipInput {...args} />
  </ThemeProvider>
)

export const ChipInputWithValues = Template.bind({})
ChipInputWithValues.args = {
  value: ['first', 'second'],
  placeholder: 'Please input value',
}

export const ChipInputWithValidation = Template.bind({})
ChipInputWithValidation.args = {
  value: ['123', '456'],
  validator: (value: string) => /\d+/.test(value),
  placeholder: 'Please input number value',
  errorText: 'Only numbers are accepted',
}
