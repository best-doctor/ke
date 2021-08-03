import { FC } from 'react'

export function makePartial<Props, Predefined extends Partial<Props>>(
  base: FC<Props>,
  predefined: Predefined
): FC<Omit<Props, keyof Predefined>> {
  return (props) => base(({ ...props, ...predefined } as unknown) as Props)
}
