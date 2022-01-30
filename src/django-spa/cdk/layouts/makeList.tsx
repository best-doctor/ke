import React, { ComponentType, Key, ReactChild, ReactElement } from 'react'

import { LayoutComponent } from './types'

type ListItemDesc<ItemProps> = ItemProps & {
  key?: Key
  content: ReactChild
}

/**
 * Создаёт компонент-макет для списков
 *
 * @example
 * ```
 * const Root: FC<{ first: number }> = ...
 * cont Item: FC<{ foo: boolean }> = ...
 * const List = makeList(Root, Item)
 *
 * <List first={10}>{[{
 *   content: 'a'
 *   foo: true
 * }, {
 *   content: 'b'
 *   foo: false
 * }]}</List>
 * ```
 *
 * @param Container - корневой компонент
 * @param Item - компонент обёртка для элементов списка
 */
export function makeList<ContainerProps, ItemProps>(
  Container: ComponentType<ContainerProps>,
  Item: ComponentType<ItemProps>
): LayoutComponent<readonly ListItemDesc<ItemProps>[], ContainerProps> {
  return ({ children = [], ...listProps }): ReactElement => (
    // Это обёртка
    /* eslint-disable react/jsx-props-no-spreading */
    <Container {...(listProps as unknown as ContainerProps)}>
      {children.map(({ key, content, ...itemProps }, index) => (
        <Item key={key ?? index} {...(itemProps as unknown as ItemProps)}>
          {content}
        </Item>
      ))}
    </Container>
    /* eslint-enable react/jsx-props-no-spreading */
  )
}
