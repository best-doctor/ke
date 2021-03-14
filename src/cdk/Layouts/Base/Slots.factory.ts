import { ComponentProps, ComponentType, FC, PropsWithChildren, ReactElement, Children } from 'react'

export function makeSlots<S extends Slots>(
  slots: S,
  mapping: (elements: SlotElements<S>) => ReactElement
): FC<SlotsProps<S>> & S {
  const slotsMap = new Map(Object.entries(slots).map(([key, slot]) => [slot, key]))
  const slotKeys = [...Object.keys(slots)]

  const Layout = ({ slots: slotElements, children }: SlotsProps<S>): ReactElement<SlotsProps<S>> => {
    const elements = { ...slotElements }
    if (children) {
      Children.forEach(children, (child) => {
        if (!child || typeof child !== 'object' || !('type' in child) || typeof child.type === 'string') {
          throw TypeError(
            `Unacceptable child type '${JSON.stringify(child)}' for layout. Waits for one of: ${slotKeys}.`
          )
        }

        const key = slotsMap.get(child.type)

        if (!key) {
          throw new TypeError(
            `Unrecognized child component "${JSON.stringify(child.type)}" for layout. Waits for one of: ${slotKeys}.`
          )
        }

        elements[key] = child
      })
    }

    return mapping(elements as SlotElements<S>)
  }

  return Object.assign(Layout, slots)
}

type Slots = Record<string, ComponentType>

type SlotElements<S extends Slots> = {
  [K in keyof S]?: ReactElement<ComponentProps<S[K]>>
}

export type SlotsProps<S extends Slots> = PropsWithChildren<{
  slots?: SlotElements<S>
}>
