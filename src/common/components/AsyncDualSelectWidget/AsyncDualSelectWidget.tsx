import { Flex, usePrevious } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import type { Provider } from 'admin/providers/interfaces'
import type { Pagination } from 'admin/providers/pagination/interfaces'
import { ArrowLeft, ArrowRight } from 'react-feather'

import { DebounceInput } from '../../../django-spa/Controls'
import {
  SelectButton,
  CenterContainer,
  SideContainer,
  SideContainerTitle,
  StyledSearchIcon,
  StyledCloseIcon,
} from './styles'
import { SelectList } from './SelectList/SelectList'
import { WidgetProps } from '../../../typing'
import { useWidgetInitialization } from '../../hooks/useWidgetInitialization'
import { getCopyHandler, getPayload } from '../../../DetailView/utils/dataAccess'
import { WidgetWrapper } from '../WidgetWrapper'

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
  getOptionLabel: (option: object | null) => string
  getOptionValue: (option: object | null) => string
  selectedTitle?: string
  availableTitle?: string
  selectButtonTitle?: string
  unselectButtonTitle?: string
} & WidgetProps

const AsyncDualSelectWidget = (props: DualSelectWidgetProps): JSX.Element => {
  const {
    name,
    style,
    helpText,
    notifier,
    description,
    provider,
    dataResourceUrl,
    selectedTitle = 'Selected Items',
    availableTitle = 'Available Items',
    selectButtonTitle = 'SELECT',
    unselectButtonTitle = 'UNSELECT',
    getOptionLabel,
    getOptionValue,
    containerStore,
    targetPayload,
    submitChange,
    copyValue,
    useClipboard,
  } = props

  const context = containerStore.getState()

  const { targetUrl, content, isRequired } = useWidgetInitialization({
    ...props,
    context,
  })

  const handleChange = useCallback(
    (values: object[]): void => {
      const inputPayload = getPayload(values, name, targetPayload)
      submitChange({ url: targetUrl, payload: inputPayload })
    },
    [name, submitChange, targetPayload, targetUrl]
  )

  const [nextUrl, setNextUrl] = useState<string | null | undefined>('')
  const [options, setOptions] = useState<object[]>([])

  const getOptionsHandler = useCallback(
    async (url: string, searchQueryValue = ''): Promise<LoadOptionsType> => {
      const res = await provider
        .getPage(url, [
          {
            filterName: 'search',
            value: searchQueryValue,
          },
        ])
        .then(([data, , meta]: [object, object, Pagination]) => {
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
    async ({ first = false, searchQueryValue = '' }): Promise<AsyncResult<LoadOptionsType>> => {
      let url = dataResourceUrl
      if (!first && !!nextUrl) {
        url = nextUrl
      }

      if (first || nextUrl) {
        const res = await getOptionsHandler(url, searchQueryValue)
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

  const [selectedItems, setSelectedItems] = useState<string[] | null>(null)
  const selectedOptions =
    (selectedItems !== null && options.filter((o) => selectedItems.includes(getOptionValue(o)))) || []
  const availableOptions =
    (selectedItems !== null && options.filter((o) => !selectedItems.includes(getOptionValue(o)))) || []

  const isDisableSelect = availableSelected.length === 0
  const isDisableUnselect = selectedSelected.length === 0

  useEffect(() => {
    setSelectedItems([])
    loadOptions({ first: true }).then((res) => {
      setOptions(res.options)
    })
  }, [loadOptions])

  const allDeselect = useCallback(() => {
    setSelectedSelected([])
    setAvailableSelected([])
  }, [])

  const onChange = useCallback(() => {
    handleChange((selectedItems !== null && options.filter((o) => selectedItems.includes(getOptionValue(o)))) || [])
    allDeselect()
  }, [allDeselect, getOptionValue, handleChange, options, selectedItems])

  const selectButtonHandler = useCallback(() => {
    setSelectedItems(availableSelected.concat((selectedItems !== null && selectedItems) || []))
  }, [availableSelected, selectedItems])

  const unselectButtonHandler = useCallback(() => {
    setSelectedItems((selectedItems !== null && selectedItems.filter((si) => !selectedSelected.includes(si))) || [])
  }, [selectedItems, selectedSelected])

  const previousSelectedItems = usePrevious(selectedItems)
  useEffect(() => {
    if (
      selectedItems !== null &&
      previousSelectedItems !== null &&
      selectedItems.length !== previousSelectedItems.length
    ) {
      onChange()
    }
  }, [onChange, previousSelectedItems, selectedItems])

  const handleCopyValue = getCopyHandler(content, copyValue)

  const [searchActive, setSearchActive] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const handleSearchToggle = useCallback(() => {
    if (searchActive) {
      setSearchValue('')
      loadOptions({ first: true }).then((res) => {
        setOptions(res.options)
      })
    }
    setSearchActive(!searchActive)
  }, [loadOptions, searchActive])

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText || 'Items'}
      description={description}
      required={isRequired}
      notifier={notifier}
      useClipboard={useClipboard}
      copyValue={handleCopyValue}
    >
      <Flex>
        <SideContainer>
          <SideContainerTitle fontSize="md">
            {searchActive ? (
              <DebounceInput
                autoFocus
                value={searchValue}
                onChange={(newValue) => {
                  loadOptions({ first: true, searchQueryValue: newValue }).then((res) => {
                    setOptions(res.options)
                  })
                  setSearchValue(newValue)
                }}
                style={{ paddingLeft: 5 }}
                borderWidth="1px"
                borderColor="gray.300"
                height="20px"
                debounceTimeout={700}
              />
            ) : (
              availableTitle
            )}
            {searchActive ? (
              <StyledCloseIcon onClick={handleSearchToggle} />
            ) : (
              <StyledSearchIcon
                style={{ ...(searchActive ? { color: 'dodgerblue' } : undefined) }}
                onClick={handleSearchToggle}
              />
            )}
          </SideContainerTitle>
          <SelectList
            values={availableOptions}
            selectedValues={availableSelected}
            disabledValues={[]}
            handleChange={(items) => {
              setAvailableSelected(items)
            }}
            handleScrollBottom={() => {
              loadOptions({}).then((res) => {
                setOptions(options.concat(res.options))
              })
            }}
            getOptionValue={getOptionValue}
            getOptionLabel={getOptionLabel}
          />
        </SideContainer>
        <CenterContainer>
          <SelectButton
            isDisabled={isDisableSelect}
            rightIcon={<ArrowRight />}
            variant="outline"
            onClick={selectButtonHandler}
          >
            {selectButtonTitle}
          </SelectButton>
          <SelectButton
            isDisabled={isDisableUnselect}
            leftIcon={<ArrowLeft />}
            variant="outline"
            onClick={unselectButtonHandler}
          >
            {unselectButtonTitle}
          </SelectButton>
        </CenterContainer>
        <SideContainer>
          <SideContainerTitle fontSize="md">{selectedTitle}</SideContainerTitle>
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
      </Flex>
    </WidgetWrapper>
  )
}

export { AsyncDualSelectWidget }
