import React, { ComponentType, PropsWithChildren, Key } from 'react'
import { LayoutComponent, LayoutElement } from './types'

export function makeList<C>(Container: ListContainerComponent, Item: ListItemComponent<C>): LayoutComponent<Item<C>[]> {
  return ({ children }): LayoutElement<Item<C>[]> => (
    <Container>
      {children.map(([key, node]) => (
        <Item key={key}>{node}</Item>
      ))}
    </Container>
  )
}

type Item<C> = readonly [Key, C]

type ListContainerComponent = ComponentType<PropsWithChildren<{}>>

type ListItemComponent<C> = ComponentType<{ children: C }>
