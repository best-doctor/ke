import { Button } from '@chakra-ui/core'
import { BaseAdmin } from 'admin'
import { StringField } from 'admin/fields/StringField'
import { PatientProvider } from './provider'

export class PatientAdmin extends BaseAdmin {
  provider = new PatientProvider()

  list_fields = [
    {
      Header: 'Test',
      columns: [
        {
          Header: 'Id',
          accessor: 'id',
        },
        {
          Header: 'name',
          Cell: ({ row }: { row: any }) => {
            const output = `${row.original.patient.last_name} ${row.original.patient.first_name} ${row.original.patient.middle_name}`
            return output
          },
        },
      ],
    },
  ]

  detail_fields = [
    {
      name: 'first_name',
      fieldType: StringField,
      readOnly: false,
      className: 'md-col-5',
      widget: Button,
      widget_attrs: {},
      layout: { x: 100 },
    },
  ]
}
