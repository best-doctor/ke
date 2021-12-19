import { ContextsControl, ContextsData, ContextsRecord } from './types'
import { makeCommonProvider } from './makeCommonProvider'
import { makeConsumerFactory } from './makeConsumerFactory'

/**
 * Создаёт общий корневой провайдер для нескольких контекстов
 * компонент-провайдер и фабричную функцию для создания компонентов-потребителей.
 *
 * @param contexts - контексты, для которых будет создан общий провайдер
 * и фабричная-функция
 * @param proxy - прокси функция, позволяющая преобразовать передаваемые в
 * корневой компонент props перед их пробросом в контексты
 */
export function makeDistributedContext<Contexts extends ContextsRecord, RootProps = ContextsData<Contexts>>(
  contexts: Contexts,
  proxy?: (rootProps: RootProps) => ContextsData<Contexts>
): ContextsControl<Contexts, RootProps> {
  return [makeCommonProvider(contexts, proxy), makeConsumerFactory(contexts)]
}
