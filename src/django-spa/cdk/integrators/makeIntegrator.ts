import { ComponentType } from 'react'
import { mapKey } from '@utils/dicts'

import { Integrator } from './types'

/**
 * Создаёт новый объект, объединяя корневой компонент с вложенными. Прямой доступ
 * к новому объекту использует переданный корневой компонент, вложенные же
 * компоненты доступны в качестве полей объекта. Ключи предварительно прогоняются
 * через capitalize. Какой-либо дополнительной магии не происходит и фактически
 * так объединять можно произвольные объекты.
 *
 * @example
 * ```
 * const Integrator = makeIntegrator(Root, { filters: Filters, someData: Data })
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
export function makeIntegrator<Root extends ComponentType, Inners extends Record<string, ComponentType>>(
  root: Root,
  inners: Inners
): Integrator<Root, Inners> {
  const capitalizedInners = mapKey(inners, (key) => (key as string).charAt(0).toUpperCase() + (key as string).slice(1))

  return { ...root, ...capitalizedInners } as Integrator<Root, Inners>
}
