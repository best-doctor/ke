import { FC, createContext } from 'react'
import { mapValue } from '@utils/dicts'

import { ConsumerMaker, ContextDesc } from './types'
import { makeCommonRoot } from './makeCommonRoot'
import { makeConsumerFactory } from './makeConsumerFactory'

/**
 * Создаёт несколько связанных контекстов и возвращает единый корневой
 * компонент-провайдер и фабричную функцию для создания компонентов-потребителей.
 *
 * @param contextDesc - описание контекстов. Для каждого ключа будет создан
 * отдельный контекст с соответствующим значением по умолчанию
 */
export function makeDistributedContext<Desc extends ContextDesc>(
  contextDesc: Desc
): [root: FC<Desc>, makeConsumer: ConsumerMaker<Desc>] {
  const contexts = mapValue(contextDesc, (ctxDefault) => createContext(ctxDefault))

  return [makeCommonRoot(contexts), makeConsumerFactory(contexts)]
}
