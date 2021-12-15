import { Context, createElement, FC, Fragment, Provider, ReactElement } from 'react'

import { ContextDesc, ContextsForDesc } from './types'

/**
 * Создаёт единый компонент провайдер для словаря контекстов. Для передачи данных
 * в каждый из контекстов используются отдельные prop полученного элемента, с
 * ключом соответствующим ключу из переданного словаря
 *
 * @example
 * Создаём общего провайдера для двух контекстов
 * ```
 * const Root = makeCommonRoot({
 *   first: createContext(false),
 *   second: createContext(10)
 * })
 *
 * // <Root first={true} second={12}>...</Root>
 * ```
 *
 * @see {@link makeDistributedContext} для общей картины
 *
 * @param contexts - словарь контекстов, для которых будет создан общий провайдер
 */
export function makeCommonRoot<Desc extends ContextDesc>(contexts: ContextsForDesc<Desc>): FC<Desc> {
  const contextPairs = Object.entries(contexts) as [keyof Desc, Context<Desc[keyof Desc]>][]
  const providerPairs = contextPairs.map(
    ([key, ctx]) => [key, ctx.Provider] as [keyof Desc, Provider<Desc[keyof Desc]>]
  )

  return ({ children, ...props }) => {
    const root = providerPairs.reduce(
      (curChildren, [key, provider]): ReactElement =>
        createElement(provider, { value: (props as Desc)[key] }, curChildren),
      children
    ) as ReactElement | undefined

    return root || createElement(Fragment, {}, children)
  }
}
