import React, {useState} from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Select } from './Select'
import { ThemeProvider } from '../../../styles'

const options = [{text: 'first', value: '1'}, {text: 'second', value: '2'}, {text: 'third', value: '3'}]

export default {
  title: 'Components/Select',
  component: Select,
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => {
  const { value } = args
  const [v, setV] = useState(value)
  return <ThemeProvider>
    <Select {...args} value={v as Record<string, string | null>} isMulti={false} onChange={setV}/>
  </ThemeProvider>
}

const TemplateMulti: ComponentStory<typeof Select> = (args) => {
  const { value } = args
  const [v, setV] = useState(value)
  return <ThemeProvider>
    <Select {...args} value={v as Record<string, string | null>[]} isMulti onChange={setV}/>
  </ThemeProvider>
}

export const SelectWithoutValue = Template.bind({})
SelectWithoutValue.args = {
  value: null as unknown as Record<string, string | null>,
  options,
  getOptionLabel: (v) => v.text as string,
  getOptionValue: (v) => v.value as string,
  isMulti: false,
}

export const SelectWithSelectedValue = Template.bind({})
SelectWithSelectedValue.args = {
  value: {text: 'first', value: '1'},
  options,
  getOptionLabel: (v) => v.text as string,
  getOptionValue: (v) => v.value as string,
  isMulti: false,
  isClearable: false,
}

export const ClearableSelect = Template.bind({})
ClearableSelect.args = {
  value: {text: 'first', value: '1'},
  options,
  getOptionLabel: (v) => v.text as string,
  getOptionValue: (v) => v.value as string,
  isMulti: false,
  isClearable: true,
}

export const MultiSelectWithoutValue = TemplateMulti.bind({})
MultiSelectWithoutValue.args = {
  value: [],
  options,
  getOptionLabel: (v) => v.text as string,
  getOptionValue: (v) => v.value as string,
  isMulti: true,
}

export const MultiSelectWithSelectedValue = TemplateMulti.bind({})
MultiSelectWithSelectedValue.args = {
  value: [{text: 'first', value: '1'}, {text: 'third', value: '3'}],
  options,
  getOptionLabel: (v) => v.text as string,
  getOptionValue: (v) => v.value as string,
  isMulti: true,
  isClearable: false,
}

export const ClearableMultiSelect = TemplateMulti.bind({})
ClearableMultiSelect.args = {
  value: [{text: 'first', value: '1'}, {text: 'third', value: '3'}],
  options,
  getOptionLabel: (v) => v.text as string,
  getOptionValue: (v) => v.value as string,
  isMulti: true,
  isClearable: true,
}
