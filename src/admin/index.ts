import type { DetailFieldDescription, ListFieldDescription, ListFilterDescription } from './fields/FieldDescription'

export abstract class BaseAdmin {
  abstract baseUrl: string

  abstract list_filters?: ListFilterDescription[]

  abstract list_fields: ListFieldDescription[]

  abstract detail_fields: DetailFieldDescription[]
}
