export type ControlProps<T> = {
  /**
    Value of control
   */
  value: T
  /**
    Callback to be called when value is changed
   */
  onChange: (v: T) => void
}
