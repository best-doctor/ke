import { pick } from '@utils/dicts'

import { InnerMaker, IntegratorContext } from './types'

/**
 * Создаёт замыкание, связывая фабричную функцию с каким-либо словарём, что
 * позволяет предоставить пользователю возможность создавать различные сущности,
 * с некоторыми ограничениями.
 *
 * @example
 * ```
 * const contexts = {
 *   first: createContext('test'),
 *   second: createContext(10)
 * }
 * const contextsConsumerMaker = makeInnerFactory(contexts, (partContexts, userCallback) => userCallback(partContexts))
 *
 * // contextsConsumerMaker: (keys: ('first' | 'second')[], userCallback) => ...
 * // contextsConsumerMaker - можно отдать пользователю, чтобы он могу управлять
 * // созданием компонентов-консъюмеров для контекстов через userCallback,
 * // но при этом не давать ему прямого доступа к исходным контекстам.
 * ```
 *
 * @param context - контекст для связи с фабричной функцией
 * @param maker - базовая фабричная функция
 */
export function makeInnerFactory<Context extends IntegratorContext, MakerArgs extends any[], R>(
  context: Context,
  maker: (partContext: Partial<Context>, ...args: MakerArgs) => R
): InnerMaker<Context, MakerArgs, R> {
  return (keys: (keyof Context)[], ...args) => maker(pick(context, keys), ...args)
}
