import { ComponentType } from 'react'

type AsProp<TargetProps> = {
  as: ComponentType<TargetProps>
}

/**
 * Объявляет props для полиморфных компонентов-обёрток, позволяющих расширять функционал целевых компонентов.
 * Для указания целевого-компонента используется props - as
 *
 * @remarks
 * Полиморфный компонент - это компонент высшего порядка, который принимает в качестве одного из props другой компонент
 * и как-то использует его в процессе рендера. Обычно он прокидывает часть своих props непосредственно в его props,
 * и часть его props вычисляет в runtime. Этот дженерик позволят объявлять props Полиморфный компонентов единообразно,
 * указывая базовые props собственно обёртки и обязательные props для подходящих оборачиваемых компонентов. Предполагается,
 * что обязательные props вычисляются обёрткой по-ходу, и потому не должны быть публичными, а все остальные props
 * оборачиваемого компонента добавляются к результату.
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
 * type FieldProps<C extends ControlProps> = PolymorphProps<ControlProps, C, FieldPropsBase>
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
 * @param TargetProps - свойства целевого компонента
 * @param BaseProps - свойства компонента-обёртки
 */
export type PolymorphProps<RequiredProps, TargetProps extends RequiredProps, BaseProps = {}> = BaseProps &
  AsProp<TargetProps> &
  Omit<TargetProps, keyof BaseProps | keyof RequiredProps>
