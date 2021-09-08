import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Switch } from './Switch'
import { ThemeProvider } from '../../../styles'

export default {
  title: 'Components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => (
  <ThemeProvider>
    <Switch {...args} />
  </ThemeProvider>
)

export const InactiveSwitch = Template.bind({})
InactiveSwitch.args = { value: false, helpText: 'Test Switch' }

export const ActiveSwitch = Template.bind({})
ActiveSwitch.args = { value: true, helpText: 'Test Switch' }
