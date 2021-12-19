import { ComponentProps, createElement } from 'react'
import { pick } from '@utils/dicts'

import { ConsumerMaker, ContextsRecord } from './types'
import { getContextsData } from './getContextsData'

/**
 * Создаёт фабрику для создания полиморфных компонентов-потребителей данных
 * из переданных контекстов. Задача этих компонентов получить данные из одного
 * или нескольких контекстов и передать их в целевой компонент
 *
 * @example
 * ConsumerF будет брать данные из контекста first и преобразовывать их согласно
 * коллбэку, а потом передавать в компонент TargetFoo
 * ```
 * const makeConsumer = makeConsumerFactory({
 *   first: createContext(false),
 *   second: createContext(10),
 * })
 *
 * const ConsumerF = makeConsumer(['first'], ({ first }: { first: boolean }) => ({ foo: first.toString() }))
 * const TargetFoo: FC<{ foo: string, baz: number }> = ...
 *
 * //  <ConsumerF as={TargetFoo} baz={7} />
 * ```
 *
 * @see {@link makeDistributedContext} для общей картины
 *
 * @param contexts - словарь контекстов
 */
export function makeConsumerFactory<Contexts extends ContextsRecord>(contexts: Contexts): ConsumerMaker<Contexts> {
  return (keys, proxy) => {
    const consumerContexts = pick(contexts, keys)

    return ({ children, as, ...props }) => {
      const contextData = getContextsData(consumerContexts)

      const dataProps = proxy ? proxy(contextData) : contextData

      return createElement(as, { ...props, ...dataProps } as unknown as ComponentProps<typeof as>, children)
    }
  }
}
