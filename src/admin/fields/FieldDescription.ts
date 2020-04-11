import type { BaseField } from './BaseField'

type FieldPosition = {
  topLeft: number[]
  lowRight: number[]
}

export abstract class FieldDescription {
  name!: string

  readOnly!: boolean

  fieldType!: typeof BaseField

  position?: FieldPosition

  className?: string
}
