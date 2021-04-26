import React, { ChangeEvent, useEffect, useState } from 'react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { ValidationWrapper } from '../../common/components/ValidationWrapper'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import TreeSelect from 'rc-tree-select'
import { getPayload } from '../utils/dataAccess'
import { WidgetProps } from 'typing'
import { LegacyDataNode, RawValueType } from 'rc-tree-select/lib/interface'
import 'rc-tree-select/assets/index.less'

type ForeignKeySelectWidgetProps = WidgetProps & {
  optionLabel: Function
  optionValue: Function
  isClearable?: boolean
  defaultOptions?: boolean
  searchParamName?: string
  styles?: object
}
type TreeOptionObject = {
  key: string
  value: string
  label: string
  children: TreeOptionObject[] | []
  isLeaf: boolean
  childrenUrl: string | null
}

/**
 * Create select component with async loading options filtered by input text
 *
 * @param provider - used for requests to backend
 * @param dataResourceUrl - options resource URL
 * @param handleChange - callback for select value changes
 * @param value - initial value
 * @param getOptionLabel - function will get every option model and should return label
 * @param getOptionValue - function will get every option model and should return value
 * @param styles - react-select styles
 * @param isClearable - add clickable icon for select clear
 * @param isMulti - enable multiselect
 * @param defaultOptions - if array, when used as initial models for options list, if true when fire load options on render, else waiting for input
 * @param searchParamName - url parameter name which will be used with input value on options requests to backend
 * @param placeholder - text for empty select
 */
const TreeSelectWidget = (props: ForeignKeySelectWidgetProps): JSX.Element => {
  const {
    name,
    mainDetailObject,
    provider,
    helpText,
    description,
    targetPayload,
    style,
    optionLabel,
    // styles,
    containerStore,
    setInitialValue,
    // submitChange,
    notBlockingValidators = [],
    blockingValidators = [],
    useClipboard,
    notifier,
    searchParamName = 'level',
  } = props
  const context = containerStore.getState()
  const { content, dataResourceUrl } = useWidgetInitialization({ ...props, context })

  const [treeData, setTreeData] = useState<TreeOptionObject[]>([])
  const [debounce, setDebounce] = useState<any>(null)
  const [value, setValue] = React.useState<ChangeEvent<HTMLInputElement> | undefined>(
    content as ChangeEvent<HTMLInputElement> | undefined
  )
  setInitialValue(value ? getPayload(value, name, targetPayload) : null)

  useEffect(() => {
    setValue(content as ChangeEvent<HTMLInputElement> | undefined)
  }, [content])

  useEffect(() => {
    loadOptions(searchParamName, '1')
  }, [])

  const getUrl = (paramName: string, changeValue: string): string => {
    const url = new URL(dataResourceUrl)
    url.searchParams.append(paramName, changeValue)
    return url.href
  }
  const loop = (treeData: TreeOptionObject[], key: RawValueType | undefined, additionalData: TreeOptionObject[]) => {
    treeData.forEach((item) => {
      if (item.children.length) {
        loop(item.children, key, additionalData)
      } else {
        if (item.key === key) {
          item.children = additionalData
        }
      }
    })
  }
  const prepareData = (paramName: string, res: any[]) => {
    const data: TreeOptionObject[] = res.map((item: { title: string; uuid: string; children_url: string | null }) => {
      return {
        key: item.uuid,
        value: item.title,
        label: item.title,
        children: [],
        // isLeaf: item.children_url === null ? true : paramName === 'search' ? true : false,
        isLeaf: paramName === 'search' ? true : item.children_url ? false : true,
        childrenUrl: item.children_url,
      }
    })
    return data
  }
  const loadOptions = async (paramName: string, changeValue: string): Promise<TreeOptionObject[]> => {
    let url = getUrl(paramName, changeValue)
    const res = await provider.getPage(url).then(([data, ,]: [object, object, object]) => {
      return data as []
    })
    const data = prepareData(paramName, res)
    setTreeData(data)
    return Promise.resolve(data)
  }

  const handleChangeValue = (changeValue: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(changeValue)
  }
  const handleLoadData = async (treeNode: LegacyDataNode): Promise<void> => {
    if (treeNode.childrenUrl) {
      const res = await provider.getPage(treeNode.childrenUrl).then(([data, ,]: [object, object, object]) => {
        return data as []
      })
      const data = prepareData('level', res)
      let newTreeData = [...treeData]
      loop(newTreeData, treeNode.key, data)
      setTreeData(newTreeData)
    }
  }
  const handleSearch = (value: string) => {
    clearTimeout(debounce)
    setDebounce(
      setTimeout(async () => {
        if (value) {
          loadOptions('search', value)
        } else {
          loadOptions(searchParamName, '1')
        }
      }, 500)
    )
  }

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={description}
      useClipboard={useClipboard}
      notifier={notifier}
    >
      <ValidationWrapper
        notBlockingValidators={notBlockingValidators}
        blockingValidators={blockingValidators}
        provider={provider}
        detailObject={mainDetailObject}
      >
        <TreeSelect
          style={{ width: '100%', fontSize: '1rem' }}
          treeData={treeData}
          value={value}
          onChange={handleChangeValue}
          loadData={handleLoadData}
          searchPlaceholder={optionLabel}
          onSearch={handleSearch}
          showSearch
          allowClear
        />
      </ValidationWrapper>
    </WidgetWrapper>
  )
}

export { TreeSelectWidget }
