import { createContext } from 'react'
import { mapValue } from '@utils/dicts'

import { ContextDesc, ContextsForDesc, DistributedContextControl } from './types'
import { extendCommonRoot } from './extendCommonRoot'
import { extendConsumerFactory } from './extendConsumerFactory'

/**
 * Позволяет расширить уже существующий распределённый контекст дополнительными
 * данными, сохраняя обратную совместимость с уже созданными
 * компонентами-потребителями. Опционально можно изменить пропсы корневого
 * компонента.
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
 * // <BaseRoot first={20} second={false}>
 * //   <ConsumerFirst as={...} />
 * // </BaseRoot>
 *
 * const [ExtRoot, extMaker] = extendDistributedContext(
 *    [BaseRoot, baseMaker],
 *    { third: 'test' },
 *    (rootProps: { a: number, b: boolean, c: string}) => ({
 *      first: rootProps.a,
 *      second: rootProps.b,
 *      third: rootProps.c,
 *    })
 *  )
 *
 * const ConsumerSecondThird = extMaker(['second', 'third'])
 *
 * // <ExtRoot a={20} b={false} c="some text">
 * //   <ConsumerFirst as={...} />
 * //   <ConsumerSecondThird as={...} />
 * // </ExtRoot>
 * ```
 *
 * @see {@link makeDistributedContext} - для общей картины
 *
 * @param base - корневой элемент и фабричная-функция базового распределённого контекста
 * @param extContextDefault - значения по умолчанию для дополнительного контекста
 * @param proxy - проксирующая функция, преобразует пропсы от корневого компонента
 * к данным для сохранения в контекстах
 */
export function extendDistributedContext<
  BaseDesc extends ContextDesc,
  ExtDesc extends ContextDesc,
  RootProps = BaseDesc & ExtDesc
>(
  base: DistributedContextControl<BaseDesc>,
  extContextDefault: Required<ExtDesc>,
  proxy?: (rootProps: RootProps) => BaseDesc & ExtDesc
): DistributedContextControl<BaseDesc & ExtDesc, RootProps> {
  const extContexts = mapValue(extContextDefault, (ctxDefault) =>
    createContext(ctxDefault)
  ) as unknown as ContextsForDesc<ExtDesc>
  const [baseRoot, baseMaker] = base

  return [extendCommonRoot(baseRoot, extContexts, proxy), extendConsumerFactory(baseMaker, extContexts)]
}
