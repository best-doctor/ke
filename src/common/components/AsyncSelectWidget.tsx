import React, { useMemo, useState } from 'react'

import { Response, AsyncPaginate } from 'react-select-async-paginate'
import debouncePromise from 'debounce-promise'

import type { ValueType, MenuPlacement } from 'react-select'

import type { Provider } from '../../admin/providers/interfaces'

import { getAccessor } from '../../DetailView/utils/dataAccess'
import { components, modifyStyles } from './ReactSelectCustomization'
import { StatefullAsyncSelect } from '../../django-spa/StatefulControls'
import { Pagination } from '../../admin/providers/pagination'
import { Accessor } from '../../typing'

type AsyncSelectWidgetProps = {
  provider: Provider
  dataResourceUrl: string
  handleChange: Function
  value: object | null
  getOptionLabel: Function
  getOptionValue: Function
  styles?: object
  isClearable?: boolean
  isMulti?: boolean
  isDisabled?: boolean
  defaultOptions?: boolean
  closeMenuOnSelect?: boolean
  searchParamName?: string
  placeholder?: string
  cacheTime?: number
  getOptionLabelMenu?: (option: object | object[] | null) => string
  getOptionLabelValue?: (option: object | object[] | null) => string
  additionalValues?: object[]
  menuPlacement?: MenuPlacement
  className?: string
  staleTime?: Accessor<number>
}

/**
 * Create select component with async loading options filtered by input text
 *
 * @param provider - used for requests to backend
 * @param dataResourceUrl - options resource URL
 * @param handleChange - callback for select value changes
 * @param value - initial value
 * @param getOptionLabel - function will get every option model and should return label
 * @param getOptionLabelMenu - function will get every option model and should return label for meny items display
 * @param getOptionLabelValue - function will get every option model and should return label for value display
 * @param getOptionValue - function will get every option model and should return value
 * @param styles - react-select styles
 * @param isClearable - add clickable icon for select clear
 * @param isMulti - enable multiselect
 * @param defaultOptions - if array, when used as initial models for options list, if true when fire load options on render, else waiting for input
 * @param searchParamName - url parameter name which will be used with input value on options requests to backend
 * @param placeholder - text for empty select
 * @param additionalValues - some fixed values to be added into options as Accessor
 * @param isDisabled - disable select
 */
const AsyncSelectWidgetNew = ({
  dataResourceUrl,
  handleChange,
  value,
  getOptionLabel,
  getOptionValue,
  styles,
  isClearable = false,
  isMulti = false,
  defaultOptions = false,
  searchParamName = 'search',
  placeholder = 'Введите значение',
  getOptionLabelMenu,
  getOptionLabelValue,
  additionalValues = [],
  isDisabled = false,
  menuPlacement,
  className,
  staleTime,
}: AsyncSelectWidgetProps): JSX.Element => {
  const debounceValue = 500

  const widgetStyles = {
    ...{
      menuPortal: (base: object) => ({ ...base, zIndex: 9999 }),
    },
    ...(styles !== undefined ? styles : {}),
  }

  const additionalValuesFromAccessor = getAccessor(additionalValues)

  const formatOptionLabel = (
    option: object | object[] | null,
    { context }: { context: 'menu' | 'value' }
  ): string | null => {
    if (!option) {
      return option
    }
    if (context === 'menu') {
      return getOptionLabelMenu ? getOptionLabelMenu(option) : getOptionLabel(option)
    }
    return getOptionLabelValue ? getOptionLabelValue(option) : getOptionLabel(option)
  }

  const { resourceKey, params } = useMemo(() => {
    const url = new URL(dataResourceUrl)
    return {
      resourceKey: url.origin.concat(url.pathname),
      params: Object.fromEntries(url.searchParams.entries()),
    }
  }, [dataResourceUrl])

  const cacheUniqs = useMemo(() => [dataResourceUrl], [dataResourceUrl])

  return (
    <StatefullAsyncSelect
      resource={{
        key: resourceKey,
        fetchResource: {
          fetch: {
            requestConfig: {
              params,
            },
            staleTime: getAccessor(staleTime),
          },
        },
      }}
      value={value}
      onChange={(changeValue: ValueType<object | object[], boolean>) => handleChange(changeValue)}
      defaultOptions={defaultOptions || additionalValuesFromAccessor}
      isClearable={isClearable}
      isMulti={isMulti as false | undefined}
      menuPortalTarget={document.body}
      styles={modifyStyles(widgetStyles)}
      formatOptionLabel={formatOptionLabel}
      getOptionValue={(option: object | object[] | null) => (option ? getOptionValue(option) : option)}
      placeholder={placeholder}
      isDisabled={isDisabled}
      menuPlacement={menuPlacement}
      className={className}
      components={components}
      debounceTimeout={debounceValue}
      searchParamName={searchParamName}
      cacheUniqs={cacheUniqs}
    />
  )
}

type LoadOptionsType = {
  options: Accessor<object[]>
  hasMore: boolean
  additional?: Function
}

const AsyncSelectWidget = ({
  provider,
  dataResourceUrl,
  handleChange,
  value,
  getOptionLabel,
  getOptionValue,
  styles,
  isClearable = false,
  isMulti = false,
  defaultOptions = false,
  searchParamName = 'search',
  placeholder = 'Введите значение',
  getOptionLabelMenu,
  getOptionLabelValue,
  additionalValues = [],
  isDisabled = false,
  menuPlacement,
  className,
}: AsyncSelectWidgetProps): JSX.Element => {
  const debounceValue = 500

  const widgetStyles = {
    ...{
      menuPortal: (base: object) => ({ ...base, zIndex: 9999 }),
    },
    ...(styles !== undefined ? styles : {}),
  }

  const [nextUrl, setNextUrl] = useState<string | null | undefined>('')
  const [cachedChangeValue, setCachedChangeValue] = useState<string>('')
  const [usedAdditionalValues, setUsedAdditionalValues] = useState(false)

  React.useEffect(() => {
    setNextUrl('')
  }, [dataResourceUrl])

  const getUrl = (changeValue: string): string => {
    const url = new URL(dataResourceUrl)
    url.searchParams.append(searchParamName, changeValue)
    return url.href
  }

  const getOptionsHandler = async (url: string, changeValue: string): Promise<LoadOptionsType> => {
    const res = await provider.getPage(url).then(([data, , meta]: [object[], object, Pagination]) => {
      setCachedChangeValue(changeValue)
      meta.nextUrl && setNextUrl(meta.nextUrl)
      return {
        options: data,
        hasMore: !!meta.nextUrl,
      }
    })
    return res
  }

  const loadOptions = async (changeValue: string): Promise<Response<LoadOptionsType, unknown>> => {
    let url = getUrl(changeValue)
    if (changeValue === cachedChangeValue && nextUrl) {
      url = nextUrl
    }
    const res = await getOptionsHandler(url, changeValue)
    if (!usedAdditionalValues && Array.isArray(res.options)) {
      const values: object[] = getAccessor(additionalValues)
      res.options = values.concat(res.options)
      setUsedAdditionalValues(true)
    }
    return res as Response<LoadOptionsType, unknown>
  }

  const debouncedLoadOptions = debouncePromise(loadOptions, debounceValue)

  const formatOptionLabel = (
    option: object | object[] | null,
    { context }: { context: 'menu' | 'value' }
  ): string | null => {
    if (!option) {
      return option
    }
    if (context === 'menu') {
      return getOptionLabelMenu ? getOptionLabelMenu(option) : getOptionLabel(option)
    }
    return getOptionLabelValue ? getOptionLabelValue(option) : getOptionLabel(option)
  }

  return (
    <AsyncPaginate
      value={value}
      onChange={(changeValue: ValueType<object | object[], boolean>) => handleChange(changeValue)}
      loadOptions={debouncedLoadOptions}
      defaultOptions={defaultOptions}
      isClearable={isClearable}
      isMulti={isMulti as false | undefined}
      menuPortalTarget={document.body}
      styles={modifyStyles(widgetStyles)}
      formatOptionLabel={formatOptionLabel}
      getOptionValue={(option: object | object[] | null) => (option ? getOptionValue(option) : option)}
      placeholder={placeholder}
      cacheUniq={dataResourceUrl}
      isDisabled={isDisabled}
      menuPlacement={menuPlacement}
      className={className}
      components={components}
    />
  )
}

export { AsyncSelectWidgetNew, AsyncSelectWidget }
