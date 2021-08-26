import { ComponentType } from 'react'

type AsProp<TargetProps> = {
  as: ComponentType<TargetProps>
}

/**
 * Объявляет props для полиморфных компонентов-обёрток, позволяющих расширять функционал целевых компонентов.
 * Для указания целевого-компонента используется props - as
 *
 * @example
 * ```
 * interface FieldPropsBase {
 *   name: string
 * }
 *
 * interface ControlProps {
 *   value: unknown
 * }
 *
 * type FieldProps<C extends ControlProps> = PolymorphicProps<ControlProps, C, FieldPropsBase>
 *
 * // <Field
 * //    as="input"
 * //    name="foo"                        - от обёртки
 * //    onChange={(v) => console.log(v)}  - автоматически определённое свойство
 * //    type="email"                      - автоматически определённое свойство
 * // >
 * ```
 *
 * @param RequiredProps - обязательные props целевого компонента, будут недоступны в новом
 * @param TargetProps - дополнительные свойства целевого компонента, будут доступны в новом
 * @param BaseProps - свойства компонента-обёртки
 */
export type PolymorphProps<RequiredProps, TargetProps extends RequiredProps, BaseProps = {}> = BaseProps &
  AsProp<TargetProps> &
  Omit<TargetProps, keyof BaseProps | keyof RequiredProps>
