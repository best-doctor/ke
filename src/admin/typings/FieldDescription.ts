import BaseField from './BaseField'

type FieldPosition = {
  topLeft: number[]
  lowRight: number[]
}

abstract class FieldDescription {
  name!: string

  readOnly!: boolean

  fieldType!: typeof BaseField

  position?: FieldPosition

  className?: string
}

export default FieldDescription
