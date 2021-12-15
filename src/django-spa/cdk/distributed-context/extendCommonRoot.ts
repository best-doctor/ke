import { createElement, FC } from 'react'
import { omit, pick } from '@utils/dicts'

import { ContextDesc, ContextsForDesc } from './types'
import { makeCommonRoot } from './makeCommonRoot'

/**
 * Создаёт новый корневой компонент для инициализации контекстов на основе
 * существующего, добавляя к нему в качестве обёртки провайдеры дополнительных
 * контекстов
 *
 * @example
 * ```
 * // <BaseRoot first={12} second={true} />
 *
 * const ExtendedRoot = extendCommonRoot(BaseRoot, { third: createContext('test') })
 *
 * // <ExtendedRoot first={12} second={true} third="some text" />
 * ```
 *
 * @see {@link makeCommonRoot} для создания базового компонента
 * @see {@link extendDistributedContext} для общей картины
 *
 * @param baseRoot - базовый компонент
 * @param extContexts -  дополнительный контексты для инициализации
 */
export function extendCommonRoot<BaseDesc extends ContextDesc, ExtDesc extends ContextDesc>(
  baseRoot: FC<BaseDesc>,
  extContexts: ContextsForDesc<ExtDesc>
): FC<BaseDesc & ExtDesc> {
  const extRoot = makeCommonRoot(extContexts)
  const extKeys = Object.keys(extContexts) as (keyof ExtDesc)[]

  return ({ children, ...props }) => {
    const baseElement = createElement(
      baseRoot,
      omit(props as BaseDesc & ExtDesc, extKeys) as unknown as BaseDesc,
      children
    )
    return createElement(extRoot, pick(props as BaseDesc & ExtDesc, extKeys), baseElement)
  }
}
