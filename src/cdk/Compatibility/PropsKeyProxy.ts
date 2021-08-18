import { FC } from 'react'

/**
 * Создаёт компонент-обёртку, переименовывая часть или все props перед передачей
 * в исходный
 *
 * @remarks
 * Помогает быстро создавать компоненты, совместимые с каким-либо API. Если
 * дополнительно требуется преобразовывать и значение props, то можно совмещать
 * с {@link makePropsValueProxy}.
 *
 * @example
 * Простое переименование ключа foo в bar
 * ```
 * // ComponentProps<SourceComponent> = { foo: unknown }
 * const NewComponent = makePropsKeyProxy(SourceComponent, new Map([
 *  ['foo', 'bar']
 * ]))
 * // ComponentProps<NewComponent> = { bar: unknown }
 * ```
 *
 * @param source - исходный компонент
 * @param map - карта переименований вида (исходный ключ, новый ключ)
 */
export function makePropsKeyProxy<SP, SK extends keyof SP, TK extends string>(
  source: FC<SP>,
  map: ReadonlyMap<SK, TK>
): FC<Omit<SP, SK> & Record<TK, SP[SK]>> {
  return (targetProps) => {
    const sourceProps = [...map.entries()].reduce(
      (acc, [sourceKey, targetKey]) => {
        const { [targetKey]: targetVal, ...other } = acc
        return {
          ...other,
          [sourceKey]: targetVal,
        } as {}
      },
      { ...targetProps } as {}
    )
    return source(sourceProps as SP)
  }
}
