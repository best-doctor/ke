import { pick } from '@utils/dicts'

import { ConsumerMaker, ContextsRecord } from './types'
import { makeCommonConsumer } from './makeCommonConsumer'

/**
 * Создаёт замыкание, связывая фабричную функцию с словарём контекстов, что
 * позволяет предоставить пользователю возможность создавать компоненты-консъюмеры,
 * ограниченные контекстами из заданного словаря.
 *
 * Имеет смысл, когда хочется предоставить пользователю возможность создавать
 * собственные компоненты, но не хочется давать ему доступ непосредственно к
 * контекстам.
 *
 * @example
 * ```
 * const contexts = {
 *   first: createContext('test'),
 *   second: createContext(10)
 * }
 * const contextsConsumerMaker = makeConsumerFactory(contexts, (partContextsData, consumerProxy) => consumerProxy(partContextsData))
 *
 * // contextsConsumerMaker: (keys: ('first' | 'second')[], consumerProxy) => ...
 * ```
 *
 * @param contexts - контекст для связи с фабричной функцией
 */
export function makeConsumerFactory<Contexts extends ContextsRecord>(contexts: Contexts): ConsumerMaker<Contexts> {
  return (keys, proxy) => makeCommonConsumer(pick(contexts, keys), proxy)
}
