import { Button } from '@chakra-ui/core'
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
      layout: { x: 1 },
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
