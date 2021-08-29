import React, { PropsWithChildren } from 'react'

import { SelectParamsProvider, SelectResultProvider, SelectResult, SelectParams } from './Contexts'

const defaultParams = {}

const defaultOnChange = (): never => {
  throw new Error('onParamsChange callback is not defined')
}

/**
 * Корневой компонент для отображения списков/таблиц/etc. различных сущностей. Через него задаётся контекст,
 * которым пользуются остальные компоненты пакета
 */
export function SelectContainer({
  children,
  params,
  onParamsChange,
  isLoading,
  result,
}: PropsWithChildren<SelectViewProps>): JSX.Element {
  return (
    <SelectParamsProvider value={params || defaultParams} onChange={onParamsChange || defaultOnChange}>
      <SelectResultProvider result={result} status={{ isLoading }}>
        {children}
      </SelectResultProvider>
    </SelectParamsProvider>
  )
}

interface SelectViewProps {
  result: SelectResult
  isLoading: boolean
  params?: SelectParams
  onParamsChange?: (params: SelectParams) => void
}
