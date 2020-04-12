import type { BaseProvider } from './providers'
import type { FieldDescription } from './fields/FieldDescription'

export abstract class BaseAdmin {
  abstract provider: BaseProvider

  abstract list_fields: FieldDescription[]

  abstract detail_fields: FieldDescription[]
}
