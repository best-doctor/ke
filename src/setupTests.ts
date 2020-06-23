import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { Button } from '@chakra-ui/core'
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
    { name: 'patient__last_name', widget: Button, layout: { x: 100600 }, widget_attrs: { color: 'red' } },
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
