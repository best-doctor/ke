import * as React from 'react'
import RichTextEditor from 'react-rte'
import styled from 'styled-components'

import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getData, getWidgetContent, getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'

import type { BaseProvider } from '../../admin/providers'
import type { GenericAccessor } from '../../typing'
import type { BaseAnalytic } from '../../integration/analytics/base'
import type { BaseNotifier } from '../../common/notifier'

type InputWidgetProps = {
  name: string
  helpText: string
  resource: string
  detailObject: { url: string }
  useLocalStorage?: boolean | undefined
  analytics: BaseAnalytic | undefined
  widgetAnalytics: Function | boolean | undefined
  displayValue: GenericAccessor
  dataTarget: GenericAccessor
  targetPayload: GenericAccessor
  setObject: Function
  notifier: BaseNotifier
  provider: BaseProvider
  viewType: string
  style: object
  setInitialValue: Function
  submitChange: Function
  containerStore: any
}

const StyledTextEditor = styled.div`
  .text-editor-widget {
    height: 200px;
    max-height: 200px;
    overflow: scroll;
  }
`

const debounce = (func: Function, delay: number): any => {
  let timeoutId: number
  return function (...args: any[]) {
    clearInterval(timeoutId)
    // eslint-disable-next-line
    // @ts-ignore
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

const valueToEditorFormat = (value: string, format = 'html'): any => {
  return RichTextEditor.createValueFromString(value, format)
}

const valueFromEditorFormat = (value: { toString: Function }, format = 'html'): string => {
  return value.toString(format)
}

const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
  ],
}

const TextEditorWidget = (props: InputWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    detailObject,
    displayValue,
    dataTarget,
    targetPayload,
    style,
    submitChange,
    setInitialValue,
  } = props

  const [value, setValue] = React.useState(
    valueToEditorFormat(getWidgetContent(name, detailObject, displayValue) || '')
  )
  const targetUrl = getData(dataTarget, detailObject) || detailObject.url

  const debounceCallback = React.useCallback(
    debounce((callbackValue: object) => {
      submitChange({ url: targetUrl, payload: callbackValue })
    }, 1000),
    []
  )

  setInitialValue({ [name]: valueFromEditorFormat(value) })

  const handleChange = (editorValue: any): void => {
    setValue(editorValue)

    const formatedValue = valueFromEditorFormat(editorValue)
    pushAnalytics({
      eventName: EventNameEnum.INPUT_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: formatedValue,
      ...props,
    })

    const inputPayload = getPayload(formatedValue, name, targetPayload)
    debounceCallback(inputPayload)
  }

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <StyledTextEditor>
        <RichTextEditor
          // eslint-disable-next-line
          // @ts-ignore
          toolbarConfig={toolbarConfig}
          editorClassName="text-editor-widget"
          value={value}
          onChange={handleChange}
        />
      </StyledTextEditor>
    </WidgetWrapper>
  )
}

export { TextEditorWidget }
