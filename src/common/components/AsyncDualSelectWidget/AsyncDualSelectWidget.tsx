import { Flex, Text } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import type { Provider } from 'admin/providers/interfaces'
import type { Pagination } from 'admin/providers/pagination/interfaces'
import { SelectButton, CenterContainer, SideContainer, SideContainerTitle } from './styles'
import { SelectList } from './SelectList/SelectList'

export type AsyncResult<OptionType, Additional = any> = {
  options: OptionType[]
  hasMore: boolean
  additional?: Additional
}

type LoadOptionsType = {
  options: object
  hasMore: boolean
  additional?: Function
}

type DualSelectWidgetProps = {
  provider: Provider
  dataResourceUrl: string
  handleChange: (values: object[]) => void
  getOptionLabel: (option: object | null) => string
  getOptionValue: (option: object | null) => string
  title?: string
  selectedTitle?: string
  availableTitle?: string
}

const AsyncDualSelectWidget = ({
  provider,
  dataResourceUrl,
  title = 'Items',
  selectedTitle = 'Selected Items',
  availableTitle = 'Available Items',
  handleChange,
  getOptionLabel,
  getOptionValue,
}: DualSelectWidgetProps): JSX.Element => {
  const [nextUrl, setNextUrl] = useState<string | null | undefined>('')
  const [options, setOptions] = useState<object[]>([])

  const getOptionsHandler = useCallback(
    async (url: string): Promise<LoadOptionsType> => {
      const res = await provider.getPage(url).then(([data, , meta]: [object, object, Pagination]) => {
        const hasMore = !!meta.nextUrl
        setNextUrl(hasMore ? meta.nextUrl : '')
        return {
          options: data,
          hasMore,
        }
      })
      return res
    },
    [provider]
  )

  const loadOptions = useCallback(
    async (first = false): Promise<AsyncResult<LoadOptionsType>> => {
      let url = dataResourceUrl
      if (!first && !!nextUrl) {
        url = nextUrl
      }

      if (first || nextUrl) {
        const res = await getOptionsHandler(url)
        return res as AsyncResult<LoadOptionsType>
      }

      return Promise.resolve({
        options: [],
        hasMore: false,
      })
    },
    [dataResourceUrl, getOptionsHandler, nextUrl]
  )

  const [availableSelected, setAvailableSelected] = useState<string[]>([])
  const [selectedSelected, setSelectedSelected] = useState<string[]>([])

  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const selectedOptions = options.filter((o) => selectedItems.includes(getOptionValue(o)))
  const availableOptions = options.filter((o) => !selectedItems.includes(getOptionValue(o)))

  const isDisableSelect = availableSelected.length === 0
  const isDisableUnselect = selectedSelected.length === 0

  useEffect(() => {
    loadOptions(true).then((res) => {
      setOptions(res.options)
    })
    setSelectedItems([])
  }, [loadOptions])

  const allDeselect = useCallback(() => {
    setSelectedSelected([])
    setAvailableSelected([])
  }, [])

  const onChange = useCallback(() => {
    handleChange(options.filter((o) => selectedItems.includes(getOptionValue(o))))
    allDeselect()
  }, [allDeselect, getOptionValue, handleChange, options, selectedItems])

  const selectButtonHandler = useCallback(() => {
    setSelectedItems(availableSelected.concat(selectedItems))
  }, [availableSelected, selectedItems])

  const unselectButtonHandler = useCallback(() => {
    setSelectedItems(selectedItems.filter((si) => !selectedSelected.includes(si)))
  }, [selectedItems, selectedSelected])

  useEffect(() => {
    onChange()
  }, [selectedItems, onChange])

  return (
    <>
      <Text fontSize="sm">{title}</Text>
      <Flex>
        <SideContainer>
          <SideContainerTitle fontSize="lg">{selectedTitle}</SideContainerTitle>
          <SelectList
            values={selectedOptions}
            selectedValues={selectedSelected}
            handleChange={(items) => {
              setSelectedSelected(items)
            }}
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
          />
        </SideContainer>
        <CenterContainer>
          <SelectButton isDisabled={isDisableSelect} leftIcon="<" variant="outline" onClick={selectButtonHandler}>
            SELECT
          </SelectButton>
          <SelectButton isDisabled={isDisableUnselect} rightIcon=">" variant="outline" onClick={unselectButtonHandler}>
            UNSELECT
          </SelectButton>
        </CenterContainer>
        <SideContainer>
          <SideContainerTitle fontSize="lg">{availableTitle}</SideContainerTitle>
          <SelectList
            values={availableOptions}
            selectedValues={availableSelected}
            disabledValues={[]}
            handleChange={(items) => {
              setAvailableSelected(items)
            }}
            handleScrollBottom={() => {
              loadOptions().then((res) => {
                setOptions(options.concat(res.options))
              })
            }}
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
          />
        </SideContainer>
      </Flex>
    </>
  )
}

export { AsyncDualSelectWidget }
