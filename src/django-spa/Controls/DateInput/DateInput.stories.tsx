import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import 'react-datepicker/dist/react-datepicker.css'

import { DateInput } from './DateInput'
import { ThemeProvider } from '../../../styles'

export default {
  title: 'Components/DateInput',
  component: DateInput,
} as ComponentMeta<typeof DateInput>

const Template: ComponentStory<typeof DateInput> = (args) => (
  <ThemeProvider>
    <DateInput {...args} />
  </ThemeProvider>
)

export const EmptyDateInput = Template.bind({})
EmptyDateInput.args = {
  value: null,
}

export const DateInputWithValue = Template.bind({})
DateInputWithValue.args = {
  value: new Date(2021, 7, 15),
}

export const DateInputWithMinDate = Template.bind({})
DateInputWithMinDate.args = {
  value: new Date(2021, 7, 15),
  minDate: new Date(2021, 7, 10),
}

export const DateInputWithMaxDate = Template.bind({})
DateInputWithMaxDate.args = {
  value: new Date(2021, 7, 15),
  maxDate: new Date(2021, 7, 20),
}

export const DateInputWithFilterDateOnlyOddDays = Template.bind({})
DateInputWithFilterDateOnlyOddDays.args = {
  value: new Date(2021, 7, 15),
  filterDate: (date) => date.getDay() % 2 === 0,
}
