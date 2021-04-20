import React, { ReactElement, Children, ReactNode, isValidElement } from 'react'

import { LayoutChildren, LayoutComponent, LayoutElement, LayoutProps } from './types'

export function makeSlots<S extends SlotsMap>(
  slotsMap: S,
  mapping: (elements: SlotsElement<S>) => ReactElement
): LayoutComponent<SlotsData<S>> & S {
  const Layout = ({ children }: LayoutProps<SlotsData<S>>): LayoutElement<SlotsData<S>> => {
    let elements: SlotsElement<S> = {}

    elements = isSlotsData(children)
      ? elementsFromSlotsData(children, slotsMap)
      : elementsFromChildren(children, slotsMap)

    return mapping(elements) as LayoutElement<SlotsData<S>>
  }

  return Object.assign(Layout, slotsMap)
}

function isSlotsData<S extends SlotsMap>(val: SlotsData<S> | ReactNode): val is SlotsData<S> {
  return typeof val === 'object' && !isValidElement(val)
}

function elementsFromSlotsData<S extends SlotsMap>(data: SlotsData<S>, map: S): SlotsElement<S> {
  const slotKeys = [...Object.keys(map)]

  return Object.fromEntries(
    Object.entries(data).map(([key, slotContent]) => {
      if (!(key in map)) {
        throw new TypeError(`Unrecognized slots key "${key}" for layout. Waits for one of: ${slotKeys.join(', ')}.`)
      }

      const Slot = map[key]
      return [key, <Slot>{slotContent}</Slot>]
    })
  ) as SlotsElement<S>
}

function elementsFromChildren<S extends SlotsMap>(children: ReactNode, map: S): SlotsElement<S> {
  const componentToKey = new Map(Object.entries(map).map(([key, slot]) => [slot, key]))
  const slotKeys = [...Object.keys(map)]

  const pairs = Children.map(children, (child) => {
    if (!child || typeof child !== 'object' || !('type' in child) || typeof child.type === 'string') {
      throw TypeError(
        `Unacceptable child type '${JSON.stringify(child)}' for layout. Waits for one of: ${slotKeys.join(', ')}.`
      )
    }

    const key = componentToKey.get(child.type as LayoutComponent<unknown>)

    if (!key) {
      throw new TypeError(
        `Unrecognized child component "${JSON.stringify(child.type)}" for layout. Waits for one of: ${slotKeys.join(
          ', '
        )}.`
      )
    }

    return [key, child] as [keyof S, LayoutElement<unknown>]
  })

  return Object.fromEntries(pairs || []) as SlotsElement<S>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SlotsMap = Record<string, LayoutComponent<any>>

export type SlotsData<S extends SlotsMap> = {
  [K in keyof S]?: LayoutChildren<S[K]>
}

type SlotsElement<S extends SlotsMap> = {
  [K in keyof S]?: LayoutElement<LayoutProps<S[K]>>
}
