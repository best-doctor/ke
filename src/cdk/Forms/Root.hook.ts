import { FC, PropsWithChildren, useCallback, createElement } from 'react'

import { FormValue } from './types'
import { ValueContext } from './Value.context'

export function useRoot<V extends FormValue>(value: V, onChange: (val: V) => void): RootProps {
  const rootProvider = useCallback(
    ({ children }) =>
      createElement(ValueContext.Provider, { value: [value, onChange as (val: FormValue) => void] }, children),
    [value, onChange]
  )
  return {
    root: rootProvider,
  }
}

interface RootProps {
  root: FC<PropsWithChildren<{}>>
}
