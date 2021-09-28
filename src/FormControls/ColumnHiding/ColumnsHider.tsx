import {
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react'
import { ColumnConfig } from 'index'
import React, { ReactNode, ReactText, useCallback } from 'react'

export function ColumnsHider<T>({ children, onChange, columns, visibleColumns }: ColumnHiderProps<T>): JSX.Element {
  const handleChange = useCallback(
    (values: ReactText[]) => {
      const newVisibleColumns = columns.filter(({ name }) => values.includes(String(name)))

      onChange(newVisibleColumns)
    },
    [onChange, columns]
  )

  return (
    <div>
      <Popover placement="right-start">
        <PopoverTrigger>
          <Button margin="10px 0">Отображаемые колонки</Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Выберите отображаемые колонки</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody maxHeight="400px" overflow="scroll">
              <CheckboxGroup value={visibleColumns.map(({ name }) => name)} onChange={handleChange}>
                {columns.map(({ name, header }) => (
                  <Checkbox value={name} display="block">
                    {header}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      {children}
    </div>
  )
}

interface ColumnHiderProps<T> {
  visibleColumns: readonly ColumnConfig<T>[]
  onChange: (value: readonly ColumnConfig<T>[]) => void
  columns: readonly ColumnConfig<T>[]
  children?: ReactNode
}
