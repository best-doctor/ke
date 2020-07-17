import * as React from 'react'
import { FormLabel, Box } from '@chakra-ui/core'
import { mount, shallow } from 'enzyme'
import AsyncSelect from 'react-select/async'

import { ForeignKeySelect, ForeignKeySelectWidget } from '../ForeignKeySelect'
import { testProvider } from '../../setupTests'

const detailObject = {
  id: 100500,
  last_name: 'test',
}

test('FK select renders async select', () => {
  const component = mount(
    <ForeignKeySelect
      provider={testProvider}
      dataResourceUrl="/tests/"
      placeholder="test"
      handleChange={(value: any) => value.id}
      getOptionLabel={(option: any) => option.id}
      getOptionValue={(option: any) => option.id}
    />
  )

  expect(component.find(AsyncSelect).length).toEqual(1)
})

test('FK select widget properly rendered', () => {
  const component = shallow(
    <ForeignKeySelectWidget
      name='test'
      detailObject={detailObject}
      provider={testProvider}
      helpText='test'
      setObject={jest.fn()}
      displayValue='test'
      dataSource='test'
      dataTarget='test'
      targetPayload={jest.fn()}
      optionLabel={jest.fn()}
      optionValue={jest.fn()}
      notifier={jest.fn()}
      style={{}}
    />
  )

  expect(component.find(FormLabel).length).toEqual(1)
  expect(component.find(Box).length).toEqual(1)
  expect(component.find(ForeignKeySelect).length).toEqual(1)
})
