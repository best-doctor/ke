import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RadioGroup } from './RadioGroup'
import { ThemeProvider } from '../../../../styles'

type ObjWithLabelAndValue = {
  label: string
  value: string
}

const items: ObjWithLabelAndValue[] = [
  { label: 'First', value: '1' },
  { label: 'Second', value: '2' },
]

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    value: {
      type: {
        label: 'string',
        value: 'string',
      },
    },
  },
} as ComponentMeta<typeof RadioGroup>

const Template: ComponentStory<typeof RadioGroup> = (args) => {
  const getKey = (v: ObjWithLabelAndValue): string => v?.value
  const getValue = (v: ObjWithLabelAndValue): string => v?.value
  const getLabel = (v: ObjWithLabelAndValue): string => v?.label
  const { value } = args
  // Это обёртка
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <ThemeProvider>
      <RadioGroup
        {...args}
        value={value as ObjWithLabelAndValue | undefined}
        items={items}
        getKey={getKey}
        getValue={getValue}
        getLabel={getLabel}
      />
    </ThemeProvider>
  )
}

export const EmptyRadioGroup = Template.bind({})
EmptyRadioGroup.args = {}

export const RadioGroupWithDefault = Template.bind({})
RadioGroupWithDefault.args = {
  value: { label: 'Second', value: '2' },
}
