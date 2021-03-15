import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'

import { GroupControl } from '@cdk/Controls'
import { FormField } from '@cdk/Forms'
import { PropsWithLayout } from '@cdk/Layouts'

import type { FiltersValue, Filter } from './types'

export function Filters<K extends string, LP>({
  filters,
  value,
  onChange,
  layout: Layout,
  children: makeLayoutProps,
}: FiltersProps<K, LP>): ReactElement<FiltersProps<K, LP>> {
  const [, setPending] = useState(true)
  const [controlsValue, setControlsValue] = useState<typeof value>(cleanObject(value))

  useEffect(() => {
    setPending(true)
    toControlsValue(value, filters)
      .then(setControlsValue)
      .finally(() => setPending(false))
  }, [value, filters])

  const handleChange = useCallback(
    (values) => {
      fromControlsValue(values, filters).then(onChange)
    },
    [onChange, filters]
  )

  const layoutProps = useMemo(() => {
    const filterItems = filters.map(({ control, name, ...other }) => {
      return [name, <FormField name={name} as={control} {...other} />] as [key: K, field: ReactElement]
    })

    return makeLayoutProps(filterItems)
  }, [filters, makeLayoutProps])

  return (
    <GroupControl value={controlsValue} onChange={handleChange}>
      <Layout {...layoutProps} />
    </GroupControl>
  )
}

async function toControlsValue<K extends string>(
  filtersValue: FiltersValue<K>,
  filters: Filter<K>[]
): Promise<FiltersValue<K>> {
  return convertValue(filtersValue, filters, 'toControlValue')
}

async function fromControlsValue<K extends string>(
  filtersValue: FiltersValue<K>,
  filters: Filter<K>[]
): Promise<FiltersValue<K>> {
  return convertValue(filtersValue, filters, 'fromControlValue')
}

async function convertValue<K extends string>(
  filtersValue: FiltersValue<K>,
  filters: Filter<K>[],
  converterType: 'fromControlValue' | 'toControlValue'
): Promise<FiltersValue<K>> {
  const converters = new Map(filters.map((filter) => [filter.name, filter[converterType]]))
  const valuePairs = Object.entries(filtersValue)
  const converted = await Promise.all(
    valuePairs.map(([key, value]) => {
      return (converters.get(key as K) || Promise.resolve)(value)
    })
  )

  return Object.fromEntries(valuePairs.map(([key], index) => [key, converted[index]])) as FiltersValue<K>
}

function cleanObject<T>(val: T): { [K in keyof T]: undefined } {
  return Object.fromEntries(Object.entries(val).map(([key]) => [key, undefined])) as { [K in keyof T]: undefined }
}

export type FiltersProps<K extends string, LP> = PropsWithLayout<
  {
    filters: Filter<K>[]
    value: FiltersValue<K>
    onChange: (val: FiltersValue<K>) => void
  },
  readonly [key: K, field: ReactElement][],
  LP
>
