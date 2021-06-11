import React, { MouseEvent } from 'react'
import { List, ListItem } from './styles'

type SelectListProps = {
  values: object[]
  selectedValues: string[]
  getOptionLabel: (option: object) => string
  getOptionValue: (option: object) => string
  handleChange: (items: string[]) => void
  disabledValues?: string[]
  handleScrollBottom?: () => void
}

export const SelectList = ({
  values,
  selectedValues,
  getOptionLabel,
  getOptionValue,
  handleChange,
  disabledValues = [],
  handleScrollBottom,
}: SelectListProps): JSX.Element => {
  const trueValues = values.map((value) => {
    const listValue = getOptionValue(value)
    const listLabel = getOptionLabel(value)

    return {
      value: listValue,
      label: listLabel,
      selected: selectedValues.find((s) => s === listValue) !== undefined,
      disabled: disabledValues.find((d) => d === listValue) !== undefined,
      self: value,
    }
  })

  const onListClick: (e: MouseEvent<HTMLUListElement>) => void = (e: MouseEvent<HTMLUListElement>) => {
    e.stopPropagation()
    const target: HTMLElement = e.target as HTMLElement
    const valueAttribute = target.attributes.getNamedItem('value')
    const listItemValue: string = valueAttribute ? valueAttribute.value : ''
    const item = trueValues.find((tv) => tv.value === listItemValue)

    if (item !== undefined && !item.disabled) {
      let items: string[] = []
      if (!e.ctrlKey) {
        items = item.selected ? [] : [item.value]
      } else {
        items = item.selected
          ? selectedValues.filter((svItem) => svItem !== item.value)
          : selectedValues.concat([item.value])
      }
      handleChange(items)
    }
  }

  return (
    <List
      onClick={onListClick}
      onScroll={
        handleScrollBottom
          ? (e) => {
              const target: HTMLElement = e.target as HTMLElement
              if (target.scrollTop + target.clientHeight === target.scrollHeight) {
                handleScrollBottom()
              }
            }
          : undefined
      }
    >
      {trueValues.map((v) => {
        const { value, label, selected: vSelected, disabled: vDisabled } = v

        return (
          <ListItem key={value} value={value} className={`${vSelected && 'selected'} ${vDisabled && 'disabled'}`}>
            {label}
          </ListItem>
        )
      })}
    </List>
  )
}
