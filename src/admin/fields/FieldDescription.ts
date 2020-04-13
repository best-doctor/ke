import type { ReactNode } from 'react'
import type { LayoutData } from 'typing'
import type { BaseField } from './BaseField'

type FieldPosition = {
  topLeft: number[]
  lowRight: number[]
}

export abstract class FieldDescription {
  name!: string

  readOnly!: boolean

  fieldType!: typeof BaseField

  widget!: ReactNode

  layout!: LayoutData

  position?: FieldPosition

  className?: string
}
