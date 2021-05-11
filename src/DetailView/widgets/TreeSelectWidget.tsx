import React, { ChangeEvent, useEffect, useState } from 'react'

import TreeSelect from 'rc-tree-select'
import { WidgetProps } from 'typing'
import { LegacyDataNode, RawValueType } from 'rc-tree-select/lib/interface'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { ValidationWrapper } from '../../common/components/ValidationWrapper'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getPayload } from '../utils/dataAccess'
import { createGlobalStyle } from 'styled-components'
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
const StyledTreeSelect = createGlobalStyle`
  .rc-tree-select-single:not(.rc-tree-select-customize-input) .rc-tree-select-selector {
    border: 1px solid #CDD5DF;
    border-radius: 4px;
  }
  .rc-tree-select-selection-search-input {
    background: rgb(255, 255, 255)!important;
    padding: .1rem 1rem;
    font-size: 16px;
  }
  .rc-tree-select-tree-switcher {
    display: inline-block!important;
  }
  .rc-tree-select-tree-switcher_open,
  .rc-tree-select-tree-switcher_close {
    background-image: none!important;
  }
  .rc-tree-select-tree .rc-tree-select-tree-treenode span.rc-tree-select-tree-icon__close,
  .rc-tree-select-tree .rc-tree-select-tree-treenode span.rc-tree-select-tree-icon__open,
  .rc-tree-select-tree .rc-tree-select-tree-treenode span.rc-tree-select-tree-icon__docu {
    display: none!important;
  }
  .rc-tree-select-dropdown {
    background-color: white;
    border: 1px solid #d9d9d9;
    box-shadow: 0 0px 4px #d9d9d9;
    border-radius: 4px;
    box-sizing: border-box;
    z-index: 100;
    left: -9999px;
    top: -9999px;
    position: absolute;
    outline: none;
  }
  .rc-tree-select-show-arrow .rc-tree-select-arrow {
    top: .5rem;
    transform: rotate(90deg);
  }
  .rc-tree-select-clear-icon {
    font-size: 21px;
    right: 1rem;
  }
  .rc-tree-select-arrow {
    display: none;
  }
  .rc-tree-select-tree-node-selected {
    background-color: #F1F2F4;
    box-shadow: none;
    opacity: 0.8;
  }
  .rc-tree-select-tree-treenode-selected {
    background: #F1F2F4;
  }
  .rc-tree-select-single .rc-tree-select-selector .rc-tree-select-selection-item {
    top: .1rem;
    left: 1rem;
    white-space: nowrap;
    max-width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

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

  const arrowPath =
    'M765.7 486.8L314.9 134.7c-5.3-4.1' +
    '-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l36' +
    '0 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6' +
    '.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-3' +
    '7.6 0-50.4z'

  const getSvg = (path: string, iStyle = {}, style = {}) => {
    return (
      <i style={iStyle}>
        <svg
          viewBox="0 0 1024 1024"
          width="1em"
          height="1em"
          fill="currentColor"
          style={{ verticalAlign: '-.125em', ...style }}
        >
          <path d={path} />
        </svg>
      </i>
    )
  }

  const switcherIcon = (obj: any) => {
    if (obj.isLeaf) {
      return getSvg('', { cursor: 'pointer', background: 'white' }, { transform: 'rotate(270deg)' })
    }
    return getSvg(
      arrowPath,
      { cursor: 'pointer', background: 'white' },
      { transform: `rotate(${obj.expanded ? 90 : 0}deg)` }
    )
  }

  const inputIcon = getSvg(arrowPath)
  const iconProps = {
    inputIcon,
    switcherIcon,
  }
  const getUrl = (paramName: string, changeValue: string): string => {
    console.log(dataResourceUrl)

    const url = new URL('https://staging-svct.bestdoctor.ru/api/medical_program/service_tree_node/')
    url.searchParams.append(paramName, changeValue)
    return url.href
  }
  const loop = (data: TreeOptionObject[], key: RawValueType | undefined, additionalData: TreeOptionObject[]): void => {
    const newTreeData = [...data]
    newTreeData.forEach((item) => {
      if (item.children.length) {
        loop(item.children, key, additionalData)
      } else if (item.key === key) {
        item.children = additionalData // eslint-disable-line
      }
    })
    setTreeData(newTreeData)
  }
  const prepareData = (paramName: string, res: any[]): TreeOptionObject[] => {
    const data: TreeOptionObject[] = res.map((item: { title: string; uuid: string; children_url: string | null }) => {
      let isLeaf = null
      if (paramName === 'search') {
        isLeaf = true
      } else if (item.children_url) {
        isLeaf = false
      } else {
        isLeaf = true
      }
      return {
        key: item.uuid,
        value: item.title,
        label: item.title,
        children: [],
        isLeaf,
        childrenUrl: item.children_url,
      }
    })
    return data
  }
  const loadOptions = async (paramName: string, changeValue: string): Promise<TreeOptionObject[]> => {
    const url = getUrl(paramName, changeValue)
    const res = await provider.getPage(url).then(([data, ,]: [object, object, object]) => data as [])
    const data = prepareData(paramName, res)
    setTreeData(data)
    return Promise.resolve(data)
  }

  const handleChangeValue = (changeValue: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(changeValue)
  }
  const handleLoadData = async (treeNode: LegacyDataNode): Promise<void> => {
    if (treeNode.childrenUrl) {
      const res = await provider.getPage(treeNode.childrenUrl).then(([data, ,]: [object, object, object]) => data as [])
      const data = prepareData('level', res)
      const newTreeData = [...treeData]
      loop(newTreeData, treeNode.key, data)
      setTreeData(newTreeData)
    }
  }
  const handleSearch = (searchValue: string): any => {
    clearTimeout(debounce)
    setDebounce(
      setTimeout(() => {
        if (searchValue) {
          loadOptions('search', searchValue)
        } else {
          loadOptions(searchParamName, '1')
        }
      }, 500)
    )
  }
  useEffect(() => {
    setValue(content as ChangeEvent<HTMLInputElement> | undefined)
  }, [content])

  useEffect(() => {
    loadOptions(searchParamName, '1')
  }, []) // eslint-disable-line

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={description}
      useClipboard={useClipboard}
      notifier={notifier}
    >
      <StyledTreeSelect />
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
          {...iconProps}
        />
      </ValidationWrapper>
    </WidgetWrapper>
  )
}

export { TreeSelectWidget }
