import React, { useCallback, useMemo } from 'react'

import debounce from 'debounce-promise'
import Select from 'react-select/async'
import { GroupedOptionsType, OptionsType as SelectOptionType, OptionTypeBase, Props } from 'react-select'
import { DataProviderConfig, ProviderObject, withDataProvider } from '../../data-provider'

import { Option } from '../Controls/Select/types'

type LoadOptions<OptionType extends OptionTypeBase> = (
  inputValue: string,
  callback: (options: SelectOptionType<OptionType>) => void
) => Promise<any> | void

interface StatelessSearchSelectProps<OptionType extends OptionTypeBase, IsMulti extends boolean>
  extends Props<OptionType, IsMulti> {
  defaultOptions?: GroupedOptionsType<OptionType> | SelectOptionType<OptionType> | boolean
  loadOptions?: LoadOptions<OptionType>
}

function StatelessSearchSelect<T extends Option, IsMulti extends boolean>(
  { loadOptions, ...props }: StatelessSearchSelectProps<T, IsMulti>,
  { fetchList }: ProviderObject<T[]>
): JSX.Element | null {
  const handleLoadOptions = useCallback(
    (search: string) =>
      fetchList({
        requestConfig: { params: { search } },
      }),
    [fetchList]
  )

  const handleLoadOptionsDebounced = useMemo(() => debounce(handleLoadOptions, 400), [handleLoadOptions])

  return <Select {...props} loadOptions={loadOptions || handleLoadOptionsDebounced} />
}

export const StatefulSearchSelect = <T extends Option, IsMulti extends boolean = false>(
  props: StatelessSearchSelectProps<T, IsMulti> & DataProviderConfig
): JSX.Element | null => {
  const Component = withDataProvider(StatelessSearchSelect)
  return <Component {...(props as any)} />
}

// type T = {
//   key: string
//   value: string
// }

// const fc = () => {
//   return <StatefulSearchSelect<T>  resource="test" />
// }
