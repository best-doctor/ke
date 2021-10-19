import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PhoneChipInput } from './PhoneChipInput'
import { ThemeProvider } from '../../../../styles'

export default {
  title: 'Components/PhoneChipInput',
  component: PhoneChipInput,
} as ComponentMeta<typeof PhoneChipInput>

const Template: ComponentStory<typeof PhoneChipInput> = (args) => (
  <ThemeProvider>
    <PhoneChipInput {...args} />
  </ThemeProvider>
)

export const PhoneChipInputWithValues = Template.bind({})
PhoneChipInputWithValues.args = {
  value: ['+78005553535', '+78005553536'],
  placeholder: 'Please input phone value',
}
