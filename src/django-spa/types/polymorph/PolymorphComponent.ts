import { PropsWithChildren, ReactElement } from 'react'

import { PolymorphProps } from './PolymorphProps'

/**
 * Функциональный полиморфный компонент
 *
 * @see {@link PolymorphProps}
 *
 * @param RequiredProps - обязательные props целевого компонента
 */
export type PolymorphComponent<RequiredProps> = <TargetProps extends RequiredProps>(
  props: PropsWithChildren<PolymorphProps<RequiredProps, TargetProps>>
) => ReactElement
