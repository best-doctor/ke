import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DebounceInput } from './DebounceInput'
import { ThemeProvider } from '../../../styles'

export default {
  title: 'Components/DebounceInput',
  component: DebounceInput,
} as ComponentMeta<typeof DebounceInput>

const Template: ComponentStory<typeof DebounceInput> = (args) => (
  <ThemeProvider>
    <DebounceInput {...args} />
  </ThemeProvider>
)

export const EmptyDebounceInput = Template.bind({})
EmptyDebounceInput.args = { value: '' }

export const DebounceInputWithValue = Template.bind({})
DebounceInputWithValue.args = { value: 'Some test value' }

export const DebounceInputWithLongDebounceTime = Template.bind({})
DebounceInputWithLongDebounceTime.args = { value: 'Some test value', debounceTimeout: 10000 }
