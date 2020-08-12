import { mountComponents } from '../mountComponents'
import { ChakraUINotifier } from '../notifier'
import { testAdmin, testProvider } from '../../setupTests'

const detailObject = {
  id: 100500,
  patient: {
    last_name: 'Test',
  },
}

const mockSetObject = (): null => null

test('Get components to mount', () => {
  const components = mountComponents({
    resourceName: 'test-resource',
    object: detailObject,
    elements: testAdmin.detail_fields,
    provider: testProvider,
    setObject: mockSetObject,
    notifier: new ChakraUINotifier({}),
    user: {},
    analytics: undefined,
    ViewType: 'test_view',
  })

  const component = components[0]

  expect(component?.type?.name).toEqual('TextWidget')
  expect(component?.props.layout).toEqual({ x: 1, y: 3, w: 1, h: 2, static: true })
  expect(component?.props.helpText).toEqual('Test help text')
})
