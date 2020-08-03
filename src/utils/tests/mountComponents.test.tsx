import { mountComponents } from '../mountComponents'
import { testAdmin, testProvider } from '../../setupTests'

const detailObject = {
  id: 100500,
  patient: {
    last_name: 'Test',
  },
}

const mockSetObject = (): null => null
const mockNotifier = (): null => null

test('Get components to mount', () => {
  const components = mountComponents(
    'test-resource',
    detailObject,
    testAdmin.detail_fields,
    testProvider,
    mockSetObject,
    mockNotifier,
    {},
    undefined,
    'test_view'
  )

  const component = components[0]

  expect(component?.type?.name).toEqual('TextWidget')
  expect(component?.props.layout).toEqual({ x: 1, y: 3, w: 1, h: 2, static: true })
  expect(component?.props.helpText).toEqual('Test help text')
})
