import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CheckBox } from './CheckBox'
import { ThemeProvider } from '../../../../styles'

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <ThemeProvider>
    <CheckBox {...args} />
  </ThemeProvider>
)

export const InactiveCheckBox = Template.bind({})
InactiveCheckBox.args = { value: false, helpText: 'Test CheckBox' }

export const ActiveCheckBox = Template.bind({})
ActiveCheckBox.args = { value: true, helpText: 'Test CheckBox' }
