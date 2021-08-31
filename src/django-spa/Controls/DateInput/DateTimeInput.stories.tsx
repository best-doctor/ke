import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import 'react-datepicker/dist/react-datepicker.css'

import { DateTimeInput } from './DateTimeInput'
import { ThemeProvider } from '../../../styles'

export default {
  title: 'Components/DateTimeInput',
  component: DateTimeInput,
} as ComponentMeta<typeof DateTimeInput>

const Template: ComponentStory<typeof DateTimeInput> = (args) => (
  <ThemeProvider>
    <DateTimeInput {...args} />
  </ThemeProvider>
)

export const EmptyDateTimeInput = Template.bind({})
EmptyDateTimeInput.args = {
  value: null,
}

export const DateTimeInputWithValue = Template.bind({})
DateTimeInputWithValue.args = {
  value: new Date(2021, 7, 15, 12, 30),
}

export const DateTimeInputWithMinDate = Template.bind({})
DateTimeInputWithMinDate.args = {
  value: new Date(2021, 7, 15, 12, 30),
  minDate: new Date(2021, 7, 10),
}

export const DateTimeInputWithMaxDate = Template.bind({})
DateTimeInputWithMaxDate.args = {
  value: new Date(2021, 7, 15, 12, 30),
  maxDate: new Date(2021, 7, 20),
}

export const DateInputWithFilterDateOnlyOddDays = Template.bind({})
DateInputWithFilterDateOnlyOddDays.args = {
  value: new Date(2021, 7, 15, 12, 30),
  filterDate: (date) => date.getDay() % 2 === 0,
}

export const DateTimeInputWithFilterTimeOnlyOddHours = Template.bind({})
DateTimeInputWithFilterTimeOnlyOddHours.args = {
  value: new Date(2021, 7, 15, 12, 30),
  filterTime: (date) => date.getHours() % 2 === 0,
}
