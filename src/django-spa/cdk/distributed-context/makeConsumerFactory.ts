import { ComponentProps, createElement, useContext } from 'react'

import { ConsumerMaker, ContextDesc, ContextsForDesc } from './types'

/**
 * Создаёт фабрику для создания полиморфных компонентов-потребителей даынных
 * из переданных контекстов. Задача этих компонентов получить данные из одного
 * или нескольких контекстов и передать их в целевой компонент
 *
 * @example
 * ConsumerF будет брать данные из контекста first и преобразовывать их согласно
 * коллбэку, а потом передавать в компонент TargetFoo
 * ```
 * const makeConsumer = makeConsumerFactory({
 *   first: false,
 *   second: 10,
 * })
 *
 * const ConsumerF = makeConsumer(['first'], ({ first }: { first: boolean }) => ({ foo: first.toString() }))
 * const TargetFoo: FC<{ foo: string, baz: number }> = ...
 *
 * //  <ConsumerF as={TargetFoo} baz={7} />
 * ```
 *
 * @param contexts - словарь контекстов
 */
export function makeConsumerFactory<Desc extends ContextDesc>(contexts: ContextsForDesc<Desc>): ConsumerMaker<Desc> {
  const contextPairs = Object.entries(contexts)

  return (keys, proxy) => {
    const consumerContextPairs = contextPairs.filter(([key]) => (keys as Array<keyof Desc>).includes(key))

    return ({ children, as, ...props }) => {
      const contextData = consumerContextPairs.reduce(
        (acc, [key, context]) => ({
          ...acc,
          [key]: useContext(context),
        }),
        {}
      ) as Pick<Desc, typeof keys[number]>

      const dataProps = proxy ? proxy(contextData) : contextData

      return createElement(as, { ...props, ...dataProps } as unknown as ComponentProps<typeof as>, children)
    }
  }
}
