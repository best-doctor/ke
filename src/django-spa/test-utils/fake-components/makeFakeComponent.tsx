import React, { FC } from 'react'
import { pick } from '@utils/dicts'

import { makeFakeContent } from './makeFakeContent'

/**
 * Фабрика для создания фейковых компонентов. Их можно использовать в качестве
 * заглушек при тестировании для полиморфных компонентов. Возвращает компонент и
 * функцию создающую его контент, чтобы в дальнейшем можно было найти элемент на
 * странице
 *
 * @example
 * ```typescript
 * const [Fake, contentMaker] = makeFakeComponent('Fake')
 *
 * const props = {
 *   a: false,
 *   b: 'test'
 * }
 * const { getByText } = render(<Fake {...props} />)
 *
 * expect(getByText(contentMaker(props))).toBeInDocument()
 * ```
 *
 * @param componentName - имя компонента, используется, чтобы различать их в рендере
 * @param propsRenderKeys - ключи пропсов для рендера, иначе рендерятся все
 */
export function makeFakeComponent<Key extends string = string>(
  componentName: string,
  propsRenderKeys?: readonly Key[]
): [component: FC<Partial<FakeProps<Key>>>, contentMaker: (props: FakeProps<Key>) => string] {
  const makeContent = (props: FakeProps<Key>): string => {
    const renderedProps = propsRenderKeys ? pick(props, propsRenderKeys) : props
    return makeFakeContent(componentName, renderedProps)
  }

  return [(props) => <div>{makeContent(props)}</div>, (props) => makeContent(props)]
}

type FakeProps<K extends string> = Record<K, any>
