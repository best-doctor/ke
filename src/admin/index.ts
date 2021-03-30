import type {
  DetailFieldDescription,
  ListFieldDescription,
  ListFilterDescription,
  ListFilterTemplateDescription,
  WizardFieldDescription,
} from './fields/FieldDescription'

export interface BaseAdmin {
  getPageTitle?(val: Record<string, unknown> | undefined): string
  getPageFavicon?(val: Record<string, unknown> | undefined): string
}

export abstract class BaseAdmin {
  abstract baseUrl: string

  abstract verboseName?: string

  abstract permissions?: string[]

  abstract list_filters?: ListFilterDescription[]

  abstract list_filter_templates?: ListFilterTemplateDescription[]

  abstract list_fields: ListFieldDescription[]

  abstract detail_fields: DetailFieldDescription[]

  abstract wizards?: WizardFieldDescription

  getResource(lookupField?: string | undefined): string {
    if (lookupField) return `${this.baseUrl}/${lookupField}/`

    return this.baseUrl
  }
}
