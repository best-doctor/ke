import type { BaseProvider } from './providers'
import type { DetailFieldDescription, ListFieldDescription } from './fields/FieldDescription'

export abstract class BaseAdmin {
  abstract provider: BaseProvider

  abstract list_fields: ListFieldDescription[]

  abstract detail_fields: DetailFieldDescription[]
}
