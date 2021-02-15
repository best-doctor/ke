import * as React from 'react'
import { Radio, RadioGroup } from '@chakra-ui/core'

import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'

import type { WidgetProps } from '../../typing'
import { handleUserAction } from '../../common/utils/handleUserAction'
import { getAccessor } from '../utils/dataAccess'

const eventName = EventNameEnum.RADIO_BUTTON_CHOICE
const widgetType = WidgetTypeEnum.ACTION

type RadioButtonElement = {
  uuid: string
  title: string
}

type RadioButtonWidgetProps = WidgetProps & { optionLabel: Function; optionValue: Function }

const RadioButtonWidget = (props: RadioButtonWidgetProps): JSX.Element => {
  const { mainDetailObject, containerStore, provider, style, helpText, optionLabel, optionValue, cacheTime } = props
  const context = containerStore.getState()
  const effectiveCacheTime = getAccessor(cacheTime, mainDetailObject, context)

  const { dataResourceUrl, content } = useWidgetInitialization({ ...props, context })
  const [elements, setElements] = React.useState<RadioButtonElement[]>(content as RadioButtonElement[])

  React.useEffect(() => {
    if (dataResourceUrl) {
      provider
        .getPage(dataResourceUrl, undefined, undefined, effectiveCacheTime)
        .then(([data, ,]: [Model[], object, object]) => setElements(data as RadioButtonElement[]))
    }
  }, [dataResourceUrl, provider, effectiveCacheTime])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const widgetValueId = e.target.value
    const widgetValue = elements.find((element: RadioButtonElement) => element.uuid === widgetValueId)

    handleUserAction({ ...props, eventName, widgetType, widgetValue })
  }

  return (
    <WidgetWrapper style={style} helpText={helpText}>
      <RadioGroup onChange={handleChange}>
        {elements.map((element: RadioButtonElement) => (
          <Radio value={optionValue(element)}>{optionLabel(element)}</Radio>
        ))}
      </RadioGroup>
    </WidgetWrapper>
  )
}

export { RadioButtonWidget }
