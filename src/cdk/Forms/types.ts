export interface NodeProps {
  name: string | number
}

export interface FormsContextValue {
  value: unknown
  errors: string[]
}

export type FormsContextData = {
  [key in string | number]: FormsContextValue | unknown[]
}
