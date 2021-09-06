import { LayoutComponent, LayoutProps } from './types'

/**
 * Функция для создания слотовых компонентов-макетов
 *
 * @remarks
 * Слотовый макет предоставляет несколько различных точек (слотов) для вывода
 * переданных ему в children prop подкомпонентов.
 *
 * @remarks
 * Нет сложности в описание макетов, как обычных react-компонентов, но
 * использование этой функции гарантирует единообразный API для них
 *
 * @param mapping - функция, строящая итоговый элемент
 */
export function makeSlots<K extends string, Props = {}>(
  mapping: (elements: SlotElements<K>, props?: Props) => JSX.Element
): LayoutComponent<SlotElements<K>, Props> {
  return ({ children, ...props }: LayoutProps<SlotElements<K>, Props>): JSX.Element =>
    mapping(children, props as unknown as Props)
}

export type SlotElements<K extends string> = {
  [P in K]?: JSX.Element | string
}
