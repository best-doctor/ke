import { mountComponents } from '../utils/mountComponents'
import { testAdmin, testProvider, testNotifier } from '../../setupTests'

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
    mainDetailObject: detailObject,
    elements: testAdmin.detail_fields,
    provider: testProvider,
    setMainDetailObject: mockSetObject,
    refreshMainDetailObject: jest.fn(),
    notifier: testNotifier,
    user: {},
    analytics: undefined,
    ViewType: 'test_view',
    setInitialValue: jest.fn(),
    submitChange: jest.fn(),
  })

  const component = components[0].props.children[0].props.children

  expect(component?.type?.name).toEqual('ReadOnlyWidget')
  expect(component?.props.layout).toEqual({ x: 1, y: 3, w: 12, md: 12, mdOffset: 0, xs: 12, xsOffset: 0 })
  expect(component?.props.helpText).toEqual('Test help text')
})
