// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { useStore } from 'effector-react'

import { TextEditor } from '@components/controls'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getPayload } from '../utils/dataAccess'
import type { WidgetProps } from '../../typing'
import { useCreateTestId } from '../../django-spa/aspects'

type TextEditorProps = WidgetProps & {
  debounceValue?: number | undefined
}

const TextEditorWidget = (props: TextEditorProps): JSX.Element => {
  const { name, helpText, targetPayload, style, submitChange, setInitialValue, containerStore, widgetClassName } = props

  const context = useStore(containerStore)
  const { targetUrl, content, isRequired, widgetDescription } = useWidgetInitialization({ ...props, context })

  useEffect(() => {
    setInitialValue({ [name]: content })
  }, [setInitialValue, name, content])

  const handleBlur = (value: string): void => {
    const inputPayload = getPayload(value, name, targetPayload)
    submitChange({ url: targetUrl, payload: inputPayload })
  }

  const { getDataTestId } = useCreateTestId()
  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={widgetDescription}
      required={isRequired}
      {...getDataTestId(props)}
    >
      <TextEditor className={widgetClassName} value={content as string} onChange={handleBlur} />
    </WidgetWrapper>
  )
}

export { TextEditorWidget }
