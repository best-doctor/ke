import { Text } from '@chakra-ui/core'

import { mountComponents } from '../mountComponents'

const detailObject = {
  category: 100500,
  id: 100500,
  notice: "alks;djf;alksdjf;alksdjfasdfasdf",
  patient: {
    appeals_url: "",
    email: "user3061@test.com",
    first_name: "Мария",
    full_name: "Кошелева Мария Егоровна",
    last_name: "Кошелева",
    loyalty: null,
    middle_name: "Егоровна",
    notes: "",
    phone: "+79210002124",
    priority: "Обычный",
    status: "Создан",
    url: "http://localhost:9000/experimental_api/patients/f1152a0d-6af8-4078-89bc-5cce67d63e93/",
    uuid: "f1152a0d-6af8-4078-89bc-5cce67d63e93",
  },
  program: { id: 426, title: "Test", holding: "Test" },
  result: { result: 'success', text: 'Успешно' },
  status: { value: "delayed", text: "Отложено" },
  url: "http://localhost:9000/experimental_api/appeals/22/",
  user: { id: 5264, email: "test@admin.com" },
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