/* eslint-disable */
import { Text } from '@chakra-ui/core'

import { testAdmin } from '../../setupTests'
import { parseAdminSettings } from '../adminSettingsParser'

const data = {
  id: 100500,
  patient: {
    last_name: 'Some test name',
  },
}

test('Parse admin detail fields', () => {
  const expected_result = [
    {
      name: `100500patient__last_name`,
      flat_data: 'Some test name',
      widget: Text,
      widget_attrs: { color: 'red' },
      layout_data: { x: 1, y: 3, w: 1, h: 2, static: true },
    },
  ]

  const result = parseAdminSettings(testAdmin.detail_fields, data)

  expect(result).toEqual(expected_result)
})
