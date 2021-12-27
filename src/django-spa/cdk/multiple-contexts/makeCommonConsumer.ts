import { ComponentProps, createElement } from 'react'
import { PolymorphComponent } from '~types'

import { ContextsData, ContextsRecord } from './types'
import { getContextsData } from './utils'

/**
 * Создаёт полиморфный компонент, получающий данные из контекстов и пробрасывающий
 * их в целевой. Если указать proxy функцию, то данные будут предварительно
 * обработаны через неё.
 *
 * @example
 * ```
 * const contexts = {{
 *   first: createContext(false),
 *   second: createContext(10)
 * }}
 *
 * const ConsumerFirstSecond = makeCommonConsumer(contexts, ({ first, second}) => ({ a: first, b: second }))
 * const ComponentABC: FC<{a: boolean, b: number, c: string}> = ...
 *
 * // <ConsumerFirstSecond as={ComponentABC} c="test" />
 * ```
 *
 * @param contexts - словарь контекстов для подписки
 * @param proxy - коллбэк для преобразования данных из контекстов в props итогового
 * компонента
 */
export function makeCommonConsumer<Contexts extends ContextsRecord, ConsumerProps = ContextsData<Contexts>>(
  contexts: Contexts,
  proxy?: (data: ContextsData<Contexts>) => ConsumerProps
): PolymorphComponent<ConsumerProps> {
  return ({ children, as, ...props }) => {
    const contextData = getContextsData(contexts)

    const dataProps = proxy ? proxy(contextData) : contextData

    return createElement(as, { ...props, ...dataProps } as unknown as ComponentProps<typeof as>, children)
  }
}
