import React, { ComponentProps, ComponentType, FC, ReactElement, Children, ReactNode, isValidElement } from 'react'

export function makeSlots<S extends SlotsMap>(
  slotsMap: S,
  mapping: (elements: SlotsData<S>) => ReactElement
): FC<SlotsProps<S>> & S {
  const Layout = ({ slots: slotsData, children }: SlotsProps<S>): ReactElement<SlotsProps<S>> => {
    let elements: SlotElements<S> = {}

    if (slotsData) {
      elements = elementsFromSlotsData(slotsData, slotsMap)
    } else if (children) {
      elements = isSlotsData(children)
        ? elementsFromSlotsData(children, slotsMap)
        : elementsFromChildren(children, slotsMap)
    }

    return mapping(elements)
  }

  return Object.assign(Layout, slotsMap)
}

function isSlotsData<S extends SlotsMap>(val: SlotsData<S> | ReactNode): val is SlotsData<S> {
  return typeof val === 'object' && !isValidElement(val)
}

function elementsFromSlotsData<S extends SlotsMap>(data: SlotsData<S>, map: S): SlotElements<S> {
  const slotKeys = [...Object.keys(map)]

  return Object.fromEntries(
    Object.entries(data).map(([key, slotContent]) => {
      if (!(key in map)) {
        throw new TypeError(`Unrecognized slots key "${key}" for layout. Waits for one of: ${slotKeys.join(', ')}.`)
      }

      const Slot = map[key]
      return [key, <Slot>{slotContent}</Slot>]
    })
  ) as SlotElements<S>
}

function elementsFromChildren<S extends SlotsMap>(children: ReactNode, map: S): SlotElements<S> {
  const componentToKey = new Map(Object.entries(map).map(([key, slot]) => [slot, key]))
  const slotKeys = [...Object.keys(map)]

  const pairs = Children.map(children, (child) => {
    if (!child || typeof child !== 'object' || !('type' in child) || typeof child.type === 'string') {
      throw TypeError(
        `Unacceptable child type '${JSON.stringify(child)}' for layout. Waits for one of: ${slotKeys.join(', ')}.`
      )
    }

    const key = componentToKey.get(child.type)

    if (!key) {
      throw new TypeError(
        `Unrecognized child component "${JSON.stringify(child.type)}" for layout. Waits for one of: ${slotKeys.join(
          ', '
        )}.`
      )
    }

    return [key, child] as [keyof S, ReactElement<ComponentProps<S[keyof S]>, S[keyof S]>]
  })

  return Object.fromEntries(pairs || []) as SlotElements<S>
}

type SlotsMap = Record<string, SlotComponent>

type SlotsData<S extends SlotsMap> = {
  [K in keyof S]?: ComponentProps<S[K]>['children']
}

type SlotElements<S extends SlotsMap> = {
  [K in keyof S]?: ReactElement<ComponentProps<S[K]>, S[K]>
}

export type SlotsProps<S extends SlotsMap> = SlotsViaProps<S> | SlotsViaChildren<S>

interface SlotsViaProps<S extends SlotsMap> {
  slots: SlotsData<S>
  children?: never
}

interface SlotsViaChildren<S extends SlotsMap> {
  slots?: never
  children: SlotsData<S> | ReactNode
}

type SlotComponent = ComponentType<{ children: unknown }>
