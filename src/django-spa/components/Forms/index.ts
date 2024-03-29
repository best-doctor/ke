import { makeWithLayout } from '@cdk/Layouts'
import { partial } from '@utils/funcs'

import { fieldsBuilder } from './FieldsBuilder'
import { Field } from './Field'
import { ListVertical } from '../../../Layouts'

export { Form } from './Form'
export { Field } from './Field'
export { Group } from './Group'
export { Arr } from './Arr'
export { Full, WithError } from './Layouts'
export { FieldProps, FormProps } from './types'

export const FieldsBuilder = makeWithLayout(partial(fieldsBuilder, Field), ListVertical)
