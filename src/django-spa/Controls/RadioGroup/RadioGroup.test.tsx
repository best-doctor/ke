import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'

import { RadioGroup } from './RadioGroup'

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

const getComponent = (value?: Model): RenderResult =>
  render(
    <RadioGroup
      value={value}
      getKey={getValue}
      getValue={getValue}
      getLabel={getLabel}
      onChange={onChangeMock}
      items={items}
    />
  )

test('RadioGroup should selected item', () => {
  const checkBox = getComponent()

  fireEvent.click(checkBox.getByText('Value 1'))

  expect(onChangeMock).toHaveBeenCalledWith(items[0])
})

test('RadioGroup should change selected item', () => {
  const checkBox = getComponent(items[1])

  fireEvent.click(checkBox.getByText('Value 1'))

  expect(onChangeMock).toHaveBeenCalledWith(items[0])
})
