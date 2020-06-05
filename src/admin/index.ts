import type { DetailFieldDescription, ListFieldDescription } from './fields/FieldDescription'

export abstract class BaseAdmin {
  abstract baseUrl: string

  abstract list_fields: ListFieldDescription[]

  abstract detail_fields: DetailFieldDescription[]
}
