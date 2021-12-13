import React, { PropsWithChildren } from 'react'

import { ListParamsProvider, ListDataProvider, ListViewData, ListViewParams } from './Contexts'

const defaultParams = {}

const defaultOnChange = (): never => {
  throw new Error('onParamsChange callback is not defined')
}

/**
 * Корневой компонент для отображения списков/таблиц/etc. различных сущностей. Через него задаётся контекст,
 * которым пользуются остальные компоненты пакета
 */
export function ListView({
  children,
  params,
  onParamsChange,
  isLoading,
  data,
}: PropsWithChildren<ListViewProps>): JSX.Element {
  return (
    <ListParamsProvider value={params || defaultParams} onChange={onParamsChange || defaultOnChange}>
      <ListDataProvider data={data} status={{ isLoading }}>
        {children}
      </ListDataProvider>
    </ListParamsProvider>
  )
}

interface ListViewProps {
  data: ListViewData
  isLoading: boolean
  params?: ListViewParams
  onParamsChange?: (params: ListViewParams) => void
}
