import type {
  ListFieldDescription,
  DetailFieldDescription,
  ListFilterDescription,
  ListFilterTemplateDescription,
} from './fields/FieldDescription'

type FormWidgetsField =
  | ListFieldDescription[]
  | DetailFieldDescription[]
  | ListFilterDescription[]
  | ListFilterTemplateDescription[]

abstract class BaseForm {
  abstract widgets: FormWidgetsField

  abstract additional_detail_widgets: FormWidgetsField

  asView(): FormWidgetsField {
    return this.widgets
  }
}

export { BaseForm }
