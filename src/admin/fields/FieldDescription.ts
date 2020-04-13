import type { LayoutData } from 'typing'
import type { BaseField } from './BaseField'
import type { ReactNode } from 'react'

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
