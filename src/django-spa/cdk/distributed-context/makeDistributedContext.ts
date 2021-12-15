import { createContext } from 'react'
import { mapValue } from '@utils/dicts'

import { ContextDesc, ContextsForDesc, DistributedContextControl } from './types'
import { makeCommonRoot } from './makeCommonRoot'
import { makeConsumerFactory } from './makeConsumerFactory'

/**
 * Создаёт несколько связанных контекстов и возвращает единый корневой
 * компонент-провайдер и фабричную функцию для создания компонентов-потребителей.
 *
 * @param contextDefault - стартовые значения контекстов. Для каждого ключа будет создан
 * отдельный контекст.
 */
export function makeDistributedContext<Desc extends ContextDesc>(
  contextDefault: Required<Desc>
): DistributedContextControl<Desc> {
  const contexts = mapValue(contextDefault, (ctxDefault) =>
    createContext(ctxDefault)
  ) as unknown as ContextsForDesc<Desc>

  return [makeCommonRoot(contexts), makeConsumerFactory(contexts)]
}
