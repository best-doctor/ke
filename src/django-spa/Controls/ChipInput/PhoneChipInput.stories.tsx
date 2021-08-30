import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { EmailChipInput } from './EmailChipInput'
import { ThemeProvider } from '../../../styles'

export default {
  title: 'Components/EmailChipInput',
  component: EmailChipInput,
} as ComponentMeta<typeof EmailChipInput>

const Template: ComponentStory<typeof EmailChipInput> = (args) => (
  <ThemeProvider>
    <EmailChipInput {...args} />
  </ThemeProvider>
)

export const EmailChipInputWithValues = Template.bind({})
EmailChipInputWithValues.args = {
  value: ['1@test.test', '2@test.test'],
  placeholder: 'Please input email value',
}
