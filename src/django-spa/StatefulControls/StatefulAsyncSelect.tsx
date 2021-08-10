import React, { useCallback, useState } from 'react'
import { OptionTypeBase } from 'react-select'
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate'
import { StatefullProps } from '../Controls/Select/AsyncSelect'
import { ListResponse, ResourceProps, useFetchResource } from '../../data-provider/resource-provider'

export interface StatefullAsyncSelecProps<
  OptionType extends OptionTypeBase,
  Additinal = unknown,
  IsMulti extends boolean = false
> extends StatefullProps<OptionType, Additinal, IsMulti>,
    ResourceProps<ListResponse<OptionType>> {}

export const StatefullAsyncSelect = <OptionType extends OptionTypeBase>({
  resource,
  ...props
}: StatefullAsyncSelecProps<OptionType, number>): React.ReactElement => {
  const [inputValue, setInputValue] = useState('')
  const fetchResource = useFetchResource<ListResponse<OptionType>>(resource)

  const handleLoadOptoins: LoadOptions<OptionType, number> = useCallback(
    async (search: string, _, page = 0) => {
      const data = await fetchResource({
        requestConfig: {
          params: {
            search,
            page,
          },
        },
      })

      return {
        hasMore: !!data.meta?.next_url,
        options: data.data,
        additional: data.meta.page + 1,
      }
    },
    [fetchResource]
  )

  return (
    <AsyncPaginate
      {...(props as any)}
      inputValue={inputValue}
      onInputChange={setInputValue}
      loadOptions={handleLoadOptoins}
    />
  )
}
