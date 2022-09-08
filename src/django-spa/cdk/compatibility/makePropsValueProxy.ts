import { FC } from 'react'

/**
 * Создаёт компонент-обёртку, преобразующий часть или все значения props перед
 * передачей в исходный
 *
 * @remarks
 * Помогает быстро создавать компоненты, совместимые с каким-либо API. Если
 * дополнительно требуется преобразовывать и имена props, то можно совмещать
 * с {@link makePropsKeyProxy}.
 *
 * @example
 * Пытаемся привести тип значения к строчному
 * ```
 * const AnyTypeComponent = makePropsValueProxy(SourceComponent, new Map([
 *  ['foo', (val: unknown) => JSON.stringify(val)]
 * ]))
 * // Рендер <AnyTypeComponent foo={12} />
 * // эквивалентен <SourceComponent foo={JSON.stringify(12)} />
 * ```
 *
 * @param source - исходный компонент
 * @param map - карта преобразований вида (ключ, функция-конвертер)
 */
export function makePropsValueProxy<SP extends {}, SK extends keyof SP, TV>(
  source: FC<SP>,
  map: ReadonlyMap<SK, (val: unknown) => TV>
): FC<Omit<SP, SK> & Record<SK, TV>> {
  return (targetProps) => {
    const sourceProps = [...map.entries()].reduce(
      (acc, [sourceKey, converter]) => {
        const { [sourceKey]: targetVal, ...other } = acc
        return {
          ...other,
          [sourceKey]: converter(targetVal),
        } as {}
      },
      { ...targetProps } as {}
    )
    return source(sourceProps as SP)
  }
}
