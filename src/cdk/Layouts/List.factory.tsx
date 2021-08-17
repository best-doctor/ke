import React, { ComponentType, PropsWithChildren, Key, ReactNode } from 'react'
import { LayoutComponent, LayoutElement } from './types'

export function makeList(Container: ListContainerComponent, Item: ListItemComponent): LayoutComponent<Item[]> {
  return ({ children }): LayoutElement<Item[]> => (
    <Container>
      {children.map(([key, node]) => (
        <Item key={key}>{node}</Item>
      ))}
    </Container>
  )
}

type Item = [Key, ReactNode]

type ListContainerComponent = ComponentType<PropsWithChildren<{}>>

type ListItemComponent = ComponentType<PropsWithChildren<{}>>
