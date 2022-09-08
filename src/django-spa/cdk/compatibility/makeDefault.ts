import { FC, createElement, ComponentType } from 'react'

/**
 * Создаёт компонент-обёртку с частично или полностью определёнными props
 * исходного компонента в качестве значений по-умолчанию
 *
 * @remarks
 * Помогает быстро создавать компоненты, совместимые с каким-либо API.
 *
 * @example
 * Определяем `foo`, но не трогаем `bar`
 * ```
 * // ComponentProps<SourceComponent> = { foo: unknown, bar: unknown }
 * const NewComponent = makePartial(SourceComponent, { foo: 'test' })
 * // Рендер <NewComponent bar={12} />
 * // эквивалентен <SourceComponent foo="test" bar={12} />
 * // но можно и <NewComponent bar={12} foo="other test" />
 * // эквивалентен <SourceComponent foo="other test" bar={12} />
 * ```
 *
 * @param source - исходный компонент
 * @param predefined - словарь с зафиксированными props
 */
export function makeDefault<Props extends {}, Predefined extends Partial<Props>>(
  source: ComponentType<Props>,
  predefined: Predefined
): FC<Props & Predefined> {
  return (props) => createElement(source, { ...predefined, ...props })
}
