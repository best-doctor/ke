import * as React from 'react'
import { mount } from 'enzyme'
import AsyncSelect from 'react-select/async'

import { ForeignKeySelect } from '../ForeignKeySelect'
import { testProvider } from '../../setupTests'

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
