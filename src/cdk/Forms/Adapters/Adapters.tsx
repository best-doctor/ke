import * as React from 'react'
import { useCallback, ChangeEvent, forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'

export const Input = makeAdapter('input')

export const Textarea = makeAdapter('textarea')

export const Select = makeAdapter('select')

function makeAdapter<E extends keyof HTMLControls>(
  element: E
): ForwardRefExoticComponent<PropsWithoutRef<AdapterProps<E>> & RefAttributes<HTMLControls[E]>> {
  return forwardRef<HTMLControls[E], AdapterProps<E>>(({ value, onChange, ...other }, ref) => {
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value), [onChange])
    const Element = element as string
    return <Element ref={ref} value={value} onChange={handleChange} {...other} />
  })
}

type HTMLControls = {
  input: HTMLInputElement
  select: HTMLSelectElement
  textarea: HTMLTextAreaElement
}

type AdapterProps<ElementName extends keyof HTMLControls> = JSX.IntrinsicElements[ElementName] & ControlProps<string>

interface ControlProps<T> {
  value: T
  onChange: (val: T) => void
}
