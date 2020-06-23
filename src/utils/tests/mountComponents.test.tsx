import { mountComponents } from '../mountComponents'
import { testAdmin } from '../../setupTests'

const detailObject = {
  id: 100500,
  patient: {
    last_name: 'Test',
  },
}

test('Get components to mount', () => {
  const components = mountComponents(detailObject, testAdmin.detail_fields)

  const component = components[0]

  expect(component?.type?.displayName).toEqual('Button')
  expect(component?.key).toEqual('100500patient__last_name')
  expect(component?.props.color).toEqual('red')
  expect(component?.props['data-grid']).toEqual({ x: 100600 })
  expect(component?.props.children).toEqual('Test')
})
