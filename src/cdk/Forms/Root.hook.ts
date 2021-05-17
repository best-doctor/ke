import { FC, PropsWithChildren, useCallback, createElement } from 'react'

import { ArrContext, ArrRoot, RecContext, RecRoot, RootValue, RootValueDesc } from './types'
import { RootContext } from './Root.context'

export function useRoot<V extends RootValue>(value: V, onChange: (val: RootValueDesc<V>) => void): RootProps {
  const rootProvider = useCallback(
    ({ children }) =>
      createElement(
        RootContext.Provider,
        {
          value: Array.isArray(value)
            ? makeArrContextValue(value, onChange as (v: RootValueDesc<ArrRoot>) => void)
            : makeRecContextValue(value as RecRoot, onChange as (v: RootValueDesc<RecRoot>) => void),
        },
        children
      ),
    [value, onChange]
  )
  return {
    Root: rootProvider,
  }
}

function makeArrContextValue(value: ArrRoot, onChange: (val: RootValueDesc<ArrRoot>) => void): ArrContext {
  return {
    value,
    setData: onChange,
    errors: Array(value.length).fill(null) as null[],
  }
}

function makeRecContextValue(value: RecRoot, onChange: (val: RootValueDesc<RecRoot>) => void): RecContext {
  return {
    value,
    setData: onChange,
    errors: Object.fromEntries(Object.keys(value).map((key) => [key, null])),
  }
}

interface RootProps {
  Root: FC<PropsWithChildren<{}>>
}
