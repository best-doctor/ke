import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'

import { CheckBoxGroup } from './CheckBoxGroup'

const items: Model[] = [
  {
    id: '1',
    uuid: 'UUID1',
    title: 'Value 1',
  },
  {
    id: '2',
    uuid: 'UUID2',
    title: 'Value 2',
  },
]

const getValue = (v: Model): string => v.uuid

const getLabel = (v: Model): string => v.title

const onChangeMock = jest.fn()

const getComponent = (value: Model[], defaultValue: string[]): RenderResult =>
  render(
    <CheckBoxGroup
      value={value}
      getKey={getValue}
      getValue={getValue}
      getLabel={getLabel}
      onChange={onChangeMock}
      defaultValue={defaultValue}
    />
  )

test('CheckBoxGroup should add selected item', () => {
  const checkBox = getComponent(items, [])

  fireEvent.click(checkBox.getByText('Value 1'))

  expect(onChangeMock).toHaveBeenCalledWith([items[0]])
})

test('CheckBoxGroup should remove selected item', () => {
  const checkBox = getComponent(items, ['UUID1', 'UUID2'])

  fireEvent.click(checkBox.getByText('Value 1'))

  expect(onChangeMock).toHaveBeenCalledWith([items[1]])
})
