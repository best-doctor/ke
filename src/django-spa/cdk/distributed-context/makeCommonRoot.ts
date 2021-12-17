import { createElement, FC, Fragment, Provider, ReactElement } from 'react'

import { ContextsData, ContextsRecord } from './types'

/**
 * Создаёт единый компонент-провайдер для нескольких контекстов. Props
 * компонента определяются либо по соответствию ключ-значение переданного
 * словаря, либо на основе прокси-функции, с помощью которой будут
 * преобразовываться.
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
 * @param proxy - коллбэк, вызываемый при рендере компонента с переданными props,
 * длф подготовки к пробросу их в контексты.
 */
export function makeCommonRoot<Contexts extends ContextsRecord, RootProps = ContextsData<Contexts>>(
  contexts: Contexts,
  proxy?: (props: RootProps) => ContextsData<Contexts>
): FC<RootProps> {
  const providerPairs = Object.entries(contexts).map(
    ([key, ctx]) => [key, ctx.Provider] as [keyof Contexts, Provider<unknown>]
  )

  return ({ children, ...props }) => {
    const proxiedProps = proxy ? proxy(props as RootProps) : (props as ContextsData<Contexts>)
    const root = providerPairs.reduce(
      (curChildren, [key, provider]): ReactElement =>
        createElement(provider, { value: proxiedProps[key] }, curChildren),
      children
    ) as ReactElement | undefined

    return root || createElement(Fragment, {}, children)
  }
}
