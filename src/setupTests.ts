/* eslint max-classes-per-file: 0 */

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import axios from 'axios'
import fc from 'fast-check'

import type { Store } from 'effector'
import { BaseWizard, BaseWizardStep } from './WizardMaster/interfaces'
import { ChakraUINotifier } from './common/notifier'
import { ReadOnlyWidget } from './DetailView/widgets/ReadOnlyWidget'
import { BaseAdmin } from './admin/index'
import { BaseProvider } from './admin/providers/index'
import type { ResponseCache } from './admin/providers/interfaces'

fc.configureGlobal({ numRuns: 10 })
configure({ adapter: new Adapter() })

const testNotifier = new ChakraUINotifier(jest.fn())

class TestAdmin extends BaseAdmin {
  baseUrl = 'test'

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
      description: 'field description',
      widget: ReadOnlyWidget,
      layout: { x: 1, y: 3, w: 12 },
    },
  ]

  wizards = []

  favicon = '/static/icon.png'
}

const testAdmin = new TestAdmin()

const mockedHTTP = axios.create({})
mockedHTTP.defaults = { baseURL: 'https://test.com/' }

class TestProvider extends BaseProvider {
  constructor(cache?: ResponseCache) {
    super(mockedHTTP, cache)
  }
}

const testProvider = new TestProvider()

class TestWizardStep extends BaseWizardStep {
  widgets = testAdmin.detail_fields
}

const testWizardStep = new TestWizardStep('test_wizard_step')

class TestWizard extends BaseWizard {
  stateWidgetMapping = {
    begin: testWizardStep,
  }

  machine = {
    begin: {
      forward: 'test',
    },
  }
}

const testWizard = new TestWizard('Test Wizard')

const dataMockResponse = [{ id: '100500', test: 'key', uuid: '81-test-uuid-100500', title: 'test' }]

const mockPagination = {
  perPage: 100500,
  count: 100500,
  nextUrl: '',
  prevUrl: '',
  hasNext: (): boolean => false,
}

const mockedEffectorContainerStore = {
  getState: () => {},
} as Store<object>

export {
  testAdmin,
  testProvider,
  testNotifier,
  testWizard,
  testWizardStep,
  dataMockResponse,
  mockPagination,
  mockedEffectorContainerStore,
}
