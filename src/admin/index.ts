import type {
  DetailFieldDescription,
  ListFieldDescription,
  ListFilterDescription,
  ListFilterTemplateDescription,
  WizardFieldDescription,
} from './fields/FieldDescription'
import { Accessor } from '../typing'
import { Provider } from './providers'

export type OnDetailObjectLoadedProps = {
  mainDetailObject: Model
  provider: Provider
  context: object
  setInitialValue: Function
}

export interface BaseAdmin {
  getPageTitle?(val: Record<string, unknown> | undefined): string
  getPageFavicon?(val: Record<string, unknown> | undefined): string
  onDetailObjectLoaded?(props: OnDetailObjectLoadedProps): Promise<void>
  hideListView?: Accessor<boolean>
  hideSideBar?: Accessor<boolean>
}

export abstract class BaseAdmin {
  name?: string

  abstract baseUrl: string

  abstract verboseName?: string

  abstract permissions?: string[]

  abstract list_filters?: ListFilterDescription[]

  abstract list_filter_templates?: ListFilterTemplateDescription[]

  abstract list_fields: ListFieldDescription[]

  abstract detail_fields: DetailFieldDescription[]

  abstract wizards?: WizardFieldDescription

  abstract favicon?: string

  getResource(lookupField?: string | undefined): string {
    if (lookupField) return `${this.baseUrl}/${lookupField}/`

    return this.baseUrl
  }
}
