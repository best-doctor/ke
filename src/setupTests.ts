/* eslint max-classes-per-file: 0 */

import { configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import axios from 'axios'

import { ChakraUINotifier } from './utils/notifier'
import { TextWidget } from './DetailView/widgets/TextWidget'
import { BaseAdmin } from './admin/index'
import { BaseProvider } from './admin/providers/index'

configure({ adapter: new Adapter() })

class TestAdmin extends BaseAdmin {
  baseUrl = 'https://test.com/test'

  permissions = undefined

  verboseName = 'Test verbose name'

  list_filters = []

  list_filter_templates = []

  list_fields = [
    {
      Header: 'Id',
      accessor: 'id',
    },
  ]

  detail_fields = [
    {
      name: 'patient.last_name',
      helpText: 'Test help text',
      widget: TextWidget,
      layout: { x: 1, y: 3, w: 1, h: 2, static: true },
    },
  ]

  wizards = []
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
const testNotifier = new ChakraUINotifier(jest.fn())

export { testAdmin, testProvider, testNotifier }
