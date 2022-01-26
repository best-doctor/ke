import { ComponentProps, ReactElement, useState } from 'react'
import { Integrator, IntegratorInners, proxyIntegratorRoot } from '@cdk/integrators'
import { SelectListIntegrator } from '@components/integrators'

/**
 * Паттерн для вывода списка с поддержкой фильтрации/пагинации и выбором
 * элементов из списка.
 *
 * С помощью данного паттерна можно реализовать, multi-select
 */
export const SelectListPattern = proxyIntegratorRoot(
  SelectListIntegrator,
  ({ data, getKey, ...rest }: SelectListPatternProps<unknown>) => {
    const [selected, setSelected] = useState<unknown[]>([])
    const { items } = data
    const keys = items.map(getKey)
    const filteredSelect = selected.filter((item) => keys.includes(getKey(item)))

    return { ...rest, data, selected: [filteredSelect, setSelected] as [unknown[], (s: unknown[]) => void] }
  }
) as unknown as Integrator<
  <T>(p: SelectListPatternProps<T>) => ReactElement,
  IntegratorInners<typeof SelectListIntegrator>
> // Так как typescript ещё не поддерживает Higher-Kinded Types

interface SelectListPatternProps<T> extends Omit<ComponentProps<typeof SelectListIntegrator>, 'selected' | 'data'> {
  data: {
    items: T[]
    total: number
  }
  getKey: (item: T) => unknown
}
