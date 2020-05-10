import { Text } from '@chakra-ui/core'

import { mountComponents } from '../mountComponents'

const detailObject = {
  id: 100500,
  patient: {
    full_name: "Кошелева Мария Егоровна",
  },
}

const adminFields = [
  {
    name: "patient__full_name",
    widget: Text,
    widget_attrs: {
      color: "teal.500",
    },
    layout: { x: 2, y: 2, w: 3, h: 1, static: true },
  },
]

test('Get components to mount', () => {
  const components = mountComponents(detailObject, adminFields)
  const component = components[0]

  expect(component.type.displayName).toEqual('Text')
  expect(component.key).toEqual("100500patient__full_name")
  expect(component.props.color).toEqual("teal.500")
  expect(component.props["data-grid"]).toEqual({ x: 2, y: 2, w: 3, h: 1, static: true })
  expect(component.props.children).toEqual("Кошелева Мария Егоровна")
})