import { createContext } from 'react'
import { mapValue } from '@utils/dicts'

import { ContextDesc, ContextsForDesc, DistributedContextControl } from './types'
import { extendCommonRoot } from './extendCommonRoot'
import { extendConsumerFactory } from './extendConsumerFactory'

/**
 * Позволяет расширить уже существующий распределённый контекст дополнительными
 * данными, сохраняя обратную совместимость с уже созданными
 * компонентами-потребителями
 *
 * @example
 * ```
 * const [BaseRoot, baseMaker] = makeDistributedContext({
 *   first: 10,
 *   second: true
 * })
 *
 * const ConsumerFirst = baseMaker(['first'])
 *
 * const [ExtRoot, extMaker] = extendDistributedContext([BaseRoot, baseMaker], { third: 'test' })
 *
 * const ConsumerSecondThird = extMaker(['second', 'third'])
 *
 * // <ExtRoot first={20} second={false} third="some text">
 * //   <ConsumerFirst as={...} />
 * //   <ConsumerSecondThird as={...} />
 * // </ExtRoot>
 * ```
 *
 * @see {@link makeDistributedContext} - для общей картины
 *
 * @param base - корневой элемент и фабричная-функция базового распределённого контекста
 * @param extContextDefault - значения по умолчанию для дополнительного контекста
 */
export function extendDistributedContext<BaseDesc extends ContextDesc, ExtDesc extends ContextDesc>(
  base: DistributedContextControl<BaseDesc>,
  extContextDefault: ExtDesc
): DistributedContextControl<BaseDesc & ExtDesc> {
  const extContexts = mapValue(extContextDefault, (ctxDefault) =>
    createContext(ctxDefault)
  ) as unknown as ContextsForDesc<ExtDesc>
  const [baseRoot, baseMaker] = base

  return [extendCommonRoot(baseRoot, extContexts), extendConsumerFactory(baseMaker, extContexts)]
}
