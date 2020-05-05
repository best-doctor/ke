/* eslint-disable */
import { Button } from '@chakra-ui/core'

import { parseAdminSettings } from '../src/utils/adminSettingsParser'
import { BaseAdmin } from '../src/admin/index'
import { BaseProvider } from '../src/admin/providers/index'

class TestProvider extends BaseProvider {
  url = '/tests/'
}

class TestAdmin extends BaseAdmin {
  provider = new TestProvider()

  list_fields = [
    {
      Header: 'Test',
      columns: [
        {
          Header: 'Id',
          accessor: 'id',
        },
      ],
    },
  ]

  detail_fields = [{ name: 'last_name', widget: Button, layout: { x: 100600 } }]
}

const data = {
  id: 100500,
  last_name: 'Some test name',
}

test('Parse admin detail fields', () => {
  const admin = new TestAdmin()
  const expected_result = [{
    name: `100500last_name`,
    flat_data: 'Some test name',
    widget: Button,
    widget_attrs: undefined,
    layout_data: { x: 100600 },
  }]

  const result = parseAdminSettings(admin.detail_fields, data)

  expect(result).toEqual(expected_result)
})
