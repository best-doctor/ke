/* eslint-disable */
import { Component } from 'react'
import { parseAdminSettings } from '../src/utils/adminSettingsParser'
import { BaseAdmin } from 'admin'
import { BaseProvider } from 'admin/providers'

class TestProvider extends BaseProvider {
  url = '/tests/'
}

class TestComponent extends Component {}

class TestAdmin extends BaseAdmin {
  provider = new TestProvider()

  list_fields = [{ name: 'first_name', widget: TestComponent, layout: { x: 100500 } }]

  detail_fields = [{ name: 'last_name', widget: TestComponent, layout: { x: 100600 } }]
}

test('Get array of parsed admin settings', () => {
  const admin = new TestAdmin()
  const testData = {
    first_name: 'Test',
    last_name: 'Test',
  }

  const result = parseAdminSettings(admin, testData)

  expect(result).toBe([])
})
