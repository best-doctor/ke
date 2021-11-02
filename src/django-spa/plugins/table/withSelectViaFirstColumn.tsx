import React, { ComponentType } from 'react'
import { ColumnConfig, TablePlugin } from '@cdk/tables'

export function withSelectViaFirstColumn(SelectHandler: ComponentType<SelectHandlerProps>): TablePlugin<SelectProps> {
  return {
    before: ({ value = [], onChange, data = [], columns, ...restProps }) => {
      const selectedAll = data.every((item) => value.includes(item))
      const setSelectedAll = (v: boolean): void => onChange(v ? [...data] : [])

      const selectColumn: ColumnConfig = {
        name: '_selected',
        header: <SelectHandler value={selectedAll} onChange={setSelectedAll} />,
        cell: (item) => (
          <SelectHandler
            value={value.includes(item)}
            onChange={(selected) => {
              if (selected && !value.includes(item)) {
                onChange([...value, item])
              }
              if (!selected && value.includes(item)) {
                onChange(value.filter((v) => v !== item))
              }
            }}
          />
        ),
      }

      return [{ ...restProps, data, columns: [selectColumn, ...columns] }]
    },
  }
}

export interface SelectProps<T = unknown> {
  value: T[]
  onChange: (value: T[]) => void
}

interface SelectHandlerProps {
  value: boolean
  onChange: (v: boolean) => void
}
