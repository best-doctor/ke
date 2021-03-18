import React, { ComponentType, FC, PropsWithChildren, ReactElement, ReactNode, isValidElement, Key } from 'react'

export function makeList<C>(Container: ListContainerComponent, Item: ListItemComponent<C>): FC<ListProps<C>> {
  return ({ items, children }): ReactElement<ListProps<C>> => {
    const listItems = items || (children && childrenToItems<C>(children)) || []
    return (
      <Container>
        {listItems.map(([key, node]) => (
          <Item key={key}>{node}</Item>
        ))}
      </Container>
    )
  }
}

function childrenToItems<C>(children: ListWithChildren<C>['children']): Item<C>[] {
  const childArr = Array.isArray(children) ? children : [children]
  return childArr.map((child, index) => {
    if (isItem(child)) {
      return child
    }
    return [(isValidElement(child) && child.key) || index, child]
  })
}

function isItem<C>(val: Item<C> | ReactNode): val is Item<C> {
  return Array.isArray(val) && val.length === 2 && (typeof val[0] === 'string' || typeof val[0] === 'number')
}

export type ListProps<C> = ListWithItems<C> | ListWithChildren<C>

interface ListWithItems<C> {
  items: readonly Item<C>[]
  children?: never
}

interface ListWithChildren<C> {
  items?: never
  children: (C | Item<C>)[] | C
}

type Item<C> = readonly [key: Key, content: C]

type ListContainerComponent = ComponentType<PropsWithChildren<{}>>

type ListItemComponent<C> = ComponentType<{ children: C }>
