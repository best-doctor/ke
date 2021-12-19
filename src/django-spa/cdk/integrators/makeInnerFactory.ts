import { pick } from '@utils/dicts'

import { InnerMaker, IntegratorContext } from './types'

export function makeInnerFactory<Context extends IntegratorContext, MakerArgs extends any[], R>(
  context: Context,
  maker: (partContext: Partial<Context>, ...args: MakerArgs) => R
): InnerMaker<Context, MakerArgs, R> {
  return (keys: (keyof Context)[], ...args) => maker(pick(context, keys), ...args)
}
