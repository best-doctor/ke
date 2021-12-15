import { createElement, FC } from 'react'
import { omit, pick } from '@utils/dicts'

import { ContextDesc, ContextsForDesc } from './types'
import { makeCommonRoot } from './makeCommonRoot'

/**
 * Создаёт новый корневой компонент для инициализации контекстов на основе
 * существующего, добавляя к нему в качестве обёртки провайдеры дополнительных
 * контекстов. Опционально с помощью proxy можно изменить props корневого
 * компонента
 *
 * @example
 * ```
 * // <BaseRoot first={12} second={true} />
 *
 * const ExtendedRoot = extendCommonRoot(
 *  BaseRoot,
 *  { third: createContext('test') },
 *  (props: {a: number, b: boolean, c: string }) => ({
 *    first: props.a,
 *     second: props.b,
 *    third: props.c,
 *  })
 * )
 *
 * // <ExtendedRoot first={12} second={true} third="some text" />
 * ```
 *
 * @see {@link makeCommonRoot} для создания базового компонента
 * @see {@link extendDistributedContext} для общей картины
 *
 * @param baseRoot - базовый компонент
 * @param extContexts - дополнительный контексты для инициализации
 * @param proxy -
 */
export function extendCommonRoot<
  BaseDesc extends ContextDesc,
  ExtDesc extends ContextDesc,
  RootProps = BaseDesc & ExtDesc
>(
  baseRoot: FC<BaseDesc>,
  extContexts: ContextsForDesc<ExtDesc>,
  proxy?: (rootProps: RootProps) => BaseDesc & ExtDesc
): FC<RootProps> {
  const extRoot = makeCommonRoot(extContexts)
  const extKeys = Object.keys(extContexts) as (keyof ExtDesc)[]

  return ({ children, ...props }) => {
    const proxiedProps = proxy ? proxy(props as RootProps) : (props as unknown as BaseDesc & ExtDesc)
    const baseElement = createElement(baseRoot, omit(proxiedProps, extKeys) as unknown as BaseDesc, children)
    return createElement(extRoot, pick(proxiedProps, extKeys), baseElement)
  }
}
