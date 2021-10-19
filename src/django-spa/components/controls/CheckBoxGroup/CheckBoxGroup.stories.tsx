import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CheckBoxGroup } from './CheckBoxGroup'
import { ThemeProvider } from '../../../../styles'

type ObjWithLabelAndValue = {
  label: string
  value: string
}

const value: ObjWithLabelAndValue[] = [
  { label: 'First', value: '1' },
  { label: 'Second', value: '2' },
]

export default {
  title: 'Components/CheckBoxGroup',
  component: CheckBoxGroup,
} as ComponentMeta<typeof CheckBoxGroup>

const Template: ComponentStory<typeof CheckBoxGroup> = (args) => {
  const getKey = (v: ObjWithLabelAndValue): string => v?.value
  const getValue = (v: ObjWithLabelAndValue): string => v?.value
  const getLabel = (v: ObjWithLabelAndValue): string => v?.label
  return (
    <ThemeProvider>
      <CheckBoxGroup {...args} value={value} getKey={getKey} getValue={getValue} getLabel={getLabel} />
    </ThemeProvider>
  )
}

export const CheckBoxGroupWithValues = Template.bind({})
CheckBoxGroupWithValues.args = {}

export const CheckBoxGroupWithDefault = Template.bind({})
CheckBoxGroupWithDefault.args = {
  defaultValue: ['2'],
}
