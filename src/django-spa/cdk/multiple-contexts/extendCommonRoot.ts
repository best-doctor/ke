import { createElement, FC } from 'react'
import { omit, pick } from '@utils/dicts'

import { ContextsData, ContextsRecord } from './types'
import { makeCommonProvider } from './makeCommonProvider'

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
 * @param proxy - проксирующая функция, преобразует пропсы от корневого компонента
 * к данным для сохранения в контекстах
 */
export function extendCommonRoot<
  BaseProps extends {},
  ExtContexts extends ContextsRecord,
  RootProps = BaseProps & ContextsData<ExtContexts>
>(
  baseRoot: FC<BaseProps>,
  extContexts: ExtContexts,
  proxy?: (rootProps: RootProps) => BaseProps & ContextsData<ExtContexts>
): FC<RootProps> {
  const extRoot = makeCommonProvider(extContexts)
  const extKeys = Object.keys(extContexts) as (keyof ExtContexts)[]

  return ({ children, ...props }) => {
    const proxiedProps = proxy ? proxy(props as RootProps) : (props as BaseProps & ContextsData<ExtContexts>)
    const baseElement = createElement(baseRoot, omit(proxiedProps, extKeys) as unknown as BaseProps, children)
    return createElement(extRoot, pick(proxiedProps, extKeys) as unknown as ContextsData<ExtContexts>, baseElement)
  }
}
