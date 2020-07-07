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

  expect(component?.type?.displayName).toEqual('Text')
  expect(component?.key).toEqual('100500patient__last_name')
  expect(component?.props.color).toEqual('red')
  expect(component?.props['data-grid']).toEqual({ x: 1, y: 3, w: 1, h: 2, static: true })
  expect(component?.props.children).toEqual('Test')
})
