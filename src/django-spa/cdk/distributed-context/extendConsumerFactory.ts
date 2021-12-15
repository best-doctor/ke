import { without } from '@utils/array'
import { pick } from '@utils/dicts'

import { ConsumerMaker, ContextDesc, ContextsForDesc } from './types'
import { getContextsData } from './getContextsData'

/**
 * Расширяет фабрику для создания полиморфных компонентов-потребителей данных
 * из переданных контекстов, позволяя пробрасывать в целевые компоненты данные
 * из дополнительных контекстов
 *
 * @example
 * ```
 * // const TestConsumer = baseMakeConsumer(['first','second'])
 *
 * const extendedMakeConsumer = extendConsumerFactory(baseMakeConsumer, {
 *   third: createContext('test')
 * })
 *
 * const ConsumerFull = extendedMakeConsumer(['first', 'second', 'third'])
 * const TargetFoo: FC<{ first: number, second: boolean, third: string }> = ...
 *
 * //  <ConsumerFull as={TargetFoo} />
 * ```
 *
 * @see {@link makeConsumerFactory} для создания базовой фабрики
 * @see {@link extendDistributedContext} для общей картины
 *
 * @param baseMaker - базовая фабрика
 * @param extContexts - словарь дополнительных контекстов
 */
export function extendConsumerFactory<BaseDesc extends ContextDesc, ExtDesc extends ContextDesc>(
  baseMaker: ConsumerMaker<BaseDesc>,
  extContexts: ContextsForDesc<ExtDesc>
): ConsumerMaker<BaseDesc & ExtDesc> {
  const allExtKeys = Object.keys(extContexts)

  return (keys, proxy) => {
    const baseKeys = without(keys, ...(allExtKeys as typeof keys)) as Exclude<typeof keys[number], keyof ExtDesc>[]
    const extKeys = without(keys, ...baseKeys) as Exclude<typeof keys[number], keyof BaseDesc>[]
    const extConsumerContexts = pick(extContexts, extKeys)

    return baseMaker(baseKeys, (baseCtx) => {
      const extCtx = getContextsData(extConsumerContexts)
      const ctx = { ...baseCtx, ...extCtx } as Pick<BaseDesc & ExtDesc, typeof keys[number]>
      return proxy ? proxy(ctx) : (ctx as ReturnType<Exclude<typeof proxy, undefined>>)
    })
  }
}
