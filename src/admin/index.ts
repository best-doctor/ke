import type { DetailFieldDescription, ListFieldDescription, ListFiltersDescription } from './fields/FieldDescription'

export abstract class BaseAdmin {
  abstract baseUrl: string

  abstract list_filters?: ListFiltersDescription[]

  abstract list_fields: ListFieldDescription[]

  abstract detail_fields: DetailFieldDescription[]
}
