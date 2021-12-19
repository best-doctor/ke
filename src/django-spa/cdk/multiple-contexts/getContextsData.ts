import { Context, useContext } from 'react'

import { ContextsData } from './types'

/**
 * Создаёт новый словарь на основе словаря контекстов, заполняя данными из
 * соответствующих контекстов.
 *
 * ВАЖНО: эта функция не предназначена для использования за пределами
 * multiple-contexts. Фактически она использует хук useContext в цикле,
 * а значит любое изменение параметров этой функции или условность её вызова
 * в рамках жизни компонента, где эта функция используется,
 * может привести трудноотслеживаемым ошибкам
 *
 * @example
 * ```
 * const first = createContext(true)
 * const second = createContext(10)
 *
 * function TestContexts(): ReactElement {
 *   const data = getContextsData({ a: first, b: second})
 *
 *   return <>{JSON.stringify(data)</>
 * }
 *
 * // { a: true, b: 10 }
 * ```
 * @internal
 *
 * @param contexts - словарь контекстов
 */
export function getContextsData<Contexts extends Record<string, Context<any>>>(
  contexts: Contexts
): ContextsData<Contexts> {
  return Object.entries(contexts).reduce(
    (acc, [key, context]) => ({
      ...acc,
      [key]: useContext(context),
    }),
    {}
  ) as ContextsData<Contexts>
}
