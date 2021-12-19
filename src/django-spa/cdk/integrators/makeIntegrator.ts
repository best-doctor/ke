import { ComponentType } from 'react'
import { mapKey } from '@utils/dicts'

import { Integrator } from './types'

export function makeIntegrator<Root extends ComponentType, Inners extends Record<string, ComponentType>>(
  root: Root,
  inners: Inners
): Integrator<Root, Inners> {
  const capitalizedInners = mapKey(inners, (key) => (key as string).charAt(0).toUpperCase() + (key as string).slice(1))

  return { ...root, ...capitalizedInners } as Integrator<Root, Inners>
}
