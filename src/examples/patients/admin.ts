import { Button, Heading } from '@chakra-ui/core'
import { BaseAdmin } from 'admin'
import { StringField } from 'admin/fields/StringField'
import { PatientProvider } from './provider'

export class PatientAdmin extends BaseAdmin {
  provider = new PatientProvider()

  list_fields = [
    {
      name: 'first_name',
      fieldType: StringField,
      readOnly: false,
      className: 'md-col-5',
      widget: Button,
      layout: { x: 10, y: 10, w: 1, h: 2 },
    },
    {
      name: 'user__email',
      fieldType: StringField,
      readOnly: false,
      className: 'md-col-5',
      widget: Heading,
      layout: { x: 0, y: 40, w: 5, h: 2 },
    },
  ]

  detail_fields = [
    {
      name: 'first_name',
      fieldType: StringField,
      readOnly: false,
      className: 'md-col-5',
      widget: Button,
      layout: { x: 100 },
    },
  ]
}
