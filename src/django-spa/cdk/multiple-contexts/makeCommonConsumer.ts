import { ComponentProps, createElement } from 'react'

import { ContextsData, ContextsRecord, PolymorphComponent } from './types'
import { getContextsData } from './utils'

export function makeCommonConsumer<Contexts extends ContextsRecord, ConsumerProps = ContextsData<Contexts>>(
  contexts: Contexts,
  proxy?: (data: ContextsData<Contexts>) => ConsumerProps
): PolymorphComponent<ConsumerProps> {
  return ({ children, as, ...props }) => {
    const contextData = getContextsData(contexts)

    const dataProps = proxy ? proxy(contextData) : contextData

    return createElement(as, { ...props, ...dataProps } as unknown as ComponentProps<typeof as>, children)
  }
}
