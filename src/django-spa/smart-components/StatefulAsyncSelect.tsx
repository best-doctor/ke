import React, { useCallback } from 'react'
import { OptionTypeBase, Props as SelectProps } from 'react-select'
import {
  AsyncPaginate,
  LoadOptions,
  useAsyncPaginate,
  UseAsyncPaginateParams,
  useComponents,
  ComponentProps,
} from 'react-select-async-paginate'
import {
  FetchResourceOptions,
  ListResponse,
  ResourceProps,
  useFetchResource,
} from '../../data-provider/resource-provider'
import { ExtendedProps } from '../../common/components/ReactSelectCustomization'

export type StatefullProps<OptionType, Additional, IsMulti extends boolean> = SelectProps<OptionType, IsMulti> &
  Omit<UseAsyncPaginateParams<OptionType, Additional>, 'loadOptions'> &
  ComponentProps & {
    useComponents?: typeof useComponents
    useAsyncPaginate?: typeof useAsyncPaginate
  }

export interface StatefullAsyncSelecProps<
  OptionType extends OptionTypeBase,
  Additinal = unknown,
  IsMulti extends boolean = false
> extends StatefullProps<OptionType, Additinal, IsMulti>,
    ResourceProps<FetchResourceOptions<ListResponse<OptionType>>>,
    ExtendedProps {
  searchParamName?: string
}

export const StatefullAsyncSelect = <OptionType extends OptionTypeBase>({
  resource,
  searchParamName = 'search',
  ...props
}: StatefullAsyncSelecProps<OptionType, number>): React.ReactElement => {
  const fetchResource = useFetchResource<ListResponse<OptionType>>(resource)

  const handleLoadOptoins: LoadOptions<OptionType, number> = useCallback(
    async (search: string, _, page = 0) => {
      const data = await fetchResource({
        requestConfig: {
          params: {
            [searchParamName]: search,
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
    [fetchResource, searchParamName]
  )

  return <AsyncPaginate {...(props as any)} loadOptions={handleLoadOptoins} />
}
