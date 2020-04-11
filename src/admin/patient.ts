import PatientProvider from 'providers/patient'

import BaseAdmin from './typings'
import StringField from './typings/StringField'
import IntegerField from './typings/IntegerField'
import ForeignKeyField from './typings/ForeignKeyField'

class PatientAdmin extends BaseAdmin {
  provider = new PatientProvider()

  fields = [
    {
      name: 'first_name',
      fieldType: StringField,
      readOnly: false,
      className: 'md-col-5',
      position: { topLeft: [1, 1], lowRight: [2, 5] },
    },
    { name: 'last_name', fieldType: StringField, readOnly: false },
    { name: 'age', fieldType: IntegerField, readOnly: true },
    { name: 'user', fieldType: ForeignKeyField, readOnly: false },
    { name: 'user__email', fieldType: StringField, readOnly: true },
  ]
}

export default PatientAdmin
