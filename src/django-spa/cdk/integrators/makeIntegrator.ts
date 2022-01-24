import { ComponentType } from 'react'

import { Integrator } from './types'

/**
 * Создаёт новый объект, объединяя корневой компонент с вложенными. Прямой доступ
 * к новому объекту использует переданный корневой компонент, вложенные же
 * компоненты доступны в качестве полей объекта. Какой-либо дополнительной магии
 * не происходит и фактически так объединять можно произвольные объекты.
 *
 * @example
 * ```
 * const Integrator = makeIntegrator(Root, { Filters: Filters, SomeData: Data })
 *
 * // <Integrator {...rootProps}>
 * //   <div>
 * //     <Integrator.SomeData {...dataProps} />
 * //   </div>
 * //   <Integrator.Filters {...filtersProps} />
 * // </Integrator>
 * ```
 *
 * @param root - корневой компонент
 * @param inners - словарь вложенных компонентов
 */
export function makeIntegrator<Root extends ComponentType<any>, Inners extends Record<string, ComponentType<any>>>(
  root: Root,
  inners: Inners
): Integrator<Root, Inners> {
  const clonedRoot = (root as CallableFunction).bind({}) as Root
  Object.entries(inners).forEach(([key, value]) => {
    ;(clonedRoot as Record<string, unknown>)[key] = value
  })
  return clonedRoot as Integrator<Root, Inners>
}
