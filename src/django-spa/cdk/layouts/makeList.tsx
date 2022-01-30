import React, { ComponentType, Key } from 'react'

import { LayoutComponent } from './types'

/**
 *
 *
 * @param Container - корневой компонент
 * @param Item - компонент обёртка
 */
export function makeList(Container: ComponentType, Item: ComponentType): LayoutComponent<Item[]> {
  return ({ children }): JSX.Element => (
    <Container>
      {children.map(([key, node]) => (
        <Item key={key}>{node}</Item>
      ))}
    </Container>
  )
}

type Item = [Key, JSX.Element]
