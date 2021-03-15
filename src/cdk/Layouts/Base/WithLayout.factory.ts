import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeWithLayout<F extends (arg: any) => any, LP>(
  source: F
): FC<PropsWithLayout<Parameters<F>[0], ReturnType<F>, LP>> {
  return ({ layout, children: makeLayoutProps, ...other }) => layout(makeLayoutProps(source(other)))
}

export type PropsWithLayout<P, R, LP> = P & {
  layout: FC<LP>
  children: (val: R) => LP
}
