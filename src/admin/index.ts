import type {
  DetailFieldDescription,
  ListFieldDescription,
  ListFilterDescription,
  ListFilterTemplateDescription,
} from './fields/FieldDescription'

export abstract class BaseAdmin {
  abstract baseUrl: string

  abstract verboseName?: string

  detailsRoute: Function = (row: any) => row.id

  abstract permissions?: string[]

  abstract list_filters?: ListFilterDescription[]

  abstract list_filter_templates?: ListFilterTemplateDescription[]

  abstract list_fields: ListFieldDescription[]

  abstract detail_fields: DetailFieldDescription[]
}
