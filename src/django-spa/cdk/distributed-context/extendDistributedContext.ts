import { ContextsControl, ContextsData, ContextsRecord } from './types'
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
 *    createContext({ third: 'test' }),
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
 * @param base - базовые корень и фабричная функция для расширения
 * @param extContexts - словарь дополнительных контекстов
 * @param proxy - проксирующая функция, преобразует пропсы от корневого компонента
 * к данным для сохранения в контекстах
 */
export function extendDistributedContext<
  BaseContexts extends ContextsRecord,
  BaseRootProps extends {},
  ExtContexts extends ContextsRecord,
  RootProps = BaseRootProps & ContextsData<ExtContexts>
>(
  base: ContextsControl<BaseContexts, BaseRootProps>,
  extContexts: ExtContexts,
  proxy?: (rootProps: RootProps) => BaseRootProps & ContextsData<ExtContexts>
): ContextsControl<BaseContexts & ExtContexts, RootProps> {
  const [baseRoot, baseMaker] = base

  return [extendCommonRoot(baseRoot, extContexts, proxy), extendConsumerFactory(baseMaker, extContexts)]
}
