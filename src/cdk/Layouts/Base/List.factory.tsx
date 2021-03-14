import React, { ComponentType, FunctionComponent, PropsWithChildren, ReactElement, ReactNode } from 'react'

export function makeList<ItemProps>(
  Container: ListContainerComponent,
  Item: ListItemComponent<ItemProps>
): FunctionComponent<ListProps<ItemProps>> {
  return ({ items }): ReactElement<ListProps<ItemProps>> => {
    return (
      <Container>
        {items.map(([key, node, itemProps]) => (
          <Item key={key} {...itemProps}>
            {node}
          </Item>
        ))}
      </Container>
    )
  }
}

export interface ListProps<ItemProps> {
  items: readonly Item<ItemProps>[]
}

type Item<ItemProps> = [key: string, node: ReactNode, itemProps: ItemProps]

type ListContainerComponent = ComponentType<PropsWithChildren<{}>>

type ListItemComponent<P> = ComponentType<PropsWithChildren<P>>
