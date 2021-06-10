import { RefObject } from 'react'

import { ControlRefProps, FieldKey } from './Fields'
import { ValidationResult } from './Validation'

export interface FormData<K extends FieldKey> {
  value: Record<K, unknown>
  relatedRefs: Record<K, RefObject<ControlRefProps> | null>
  isTouched: boolean
  validate: () => Promise<Record<string, ValidationResult>>
}
