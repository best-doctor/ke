import * as React from 'react'
import { DebounceInput } from 'react-debounce-input'
import { Textarea } from '@chakra-ui/core'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'

import type { WidgetProps } from '../../typing'

const contentType = 'string'

const InputWidget = (props: WidgetProps): JSX.Element => {
  const { name, helpText, targetPayload, style, submitChange, setInitialValue, containerStore } = props

  const context = containerStore.getState()
  const { targetUrl, content } = useWidgetInitialization({ ...props, contentType, context })

  setInitialValue({ [name]: content })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    pushAnalytics({ eventName: EventNameEnum.INPUT_CHANGE, widgetType: WidgetTypeEnum.INPUT, value: e, ...props })

    const inputPayload = getPayload(e.target.value, name, targetPayload)
    submitChange({ url: targetUrl, payload: inputPayload })
  }

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <DebounceInput
        value={content as string}
        resize="none"
        height={263}
        borderWidth="2px"
        borderColor="gray.300"
        debounceTimeout={1000}
        element={Textarea as React.FC}
        onChange={(e) => handleChange(e)}
      />
    </WidgetWrapper>
  )
}

export { InputWidget }
