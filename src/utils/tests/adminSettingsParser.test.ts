/* eslint-disable */
import { Button } from '@chakra-ui/core'

import { parseAdminSettings } from '../adminSettingsParser'
import { BaseAdmin } from '../../admin/index'
import { BaseProvider } from '../../admin/providers/index'

class TestProvider extends BaseProvider {
  constructor() {
    super('https://test.com/tests/')
  }
}

class TestAdmin extends BaseAdmin {
  provider = new TestProvider()

  list_fields = [
    {
      Header: 'Id',
      accessor: 'id',
    },
  ]

  detail_fields = [{ name: 'last_name', widget: Button, layout: { x: 100600 }, widget_attrs: { color: 'red' } }]
}

const data = {
  id: 100500,
  last_name: 'Some test name',
}

test('Parse admin detail fields', () => {
  const admin = new TestAdmin()
  const expected_result = [
    {
      name: `100500last_name`,
      flat_data: 'Some test name',
      widget: Button,
      widget_attrs: { color: 'red' },
      layout_data: { x: 100600 },
    },
  ]

  const result = parseAdminSettings(admin.detail_fields, data)

  expect(result).toEqual(expected_result)
})
