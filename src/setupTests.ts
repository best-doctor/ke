/* eslint max-classes-per-file: 0 */

import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { Text } from '@chakra-ui/core'
import axios from 'axios'

import { BaseAdmin } from './admin/index'
import { BaseProvider } from './admin/providers/index'

configure({ adapter: new Adapter() })

class TestAdmin extends BaseAdmin {
  baseUrl = 'https://test.com/test'

  list_fields = [
    {
      Header: 'Id',
      accessor: 'id',
    },
  ]

  detail_fields = [
    {
      name: 'patient__last_name',
      widget: Text,
      widget_attrs: { color: 'red' },
      layout: { x: 1, y: 3, w: 1, h: 2, static: true },
    },
  ]
}

const mockedHTTP = axios.create({})
mockedHTTP.defaults = { baseURL: 'https://test.com/' }

class TestProvider extends BaseProvider {
  constructor() {
    super(mockedHTTP)
  }
}

const testAdmin = new TestAdmin()
const testProvider = new TestProvider()

export { testAdmin, testProvider }
