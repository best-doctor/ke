import { LayoutComponent, LayoutProps } from './types'

/**
 * Создаёт новый макет на основе исходного с помощью колбэка, преобразующего
 * входные пропсы
 *
 * @deprecated
 * Слишком усложняет код. Если по какой0то причине, нужно ремапить слоты, то,
 * возможно, стоит переименовать их у исходного макета, или создать новый.
 * В крайнем случае имеет смысл использовать cdk/compatibility
 *
 * @param layout - исходный макет
 * @param mapping - функция преобразования входных слотов в слоты исходного макета
 */
export function makeProxied<SourceChildren, TargetChildren>(
  layout: LayoutComponent<SourceChildren>,
  mapping: (targetChildren: TargetChildren) => SourceChildren
): LayoutComponent<TargetChildren> {
  return ({ children }: LayoutProps<TargetChildren>) => layout({ children: mapping(children) })
}
