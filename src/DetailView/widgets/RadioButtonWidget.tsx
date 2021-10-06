import React from 'react'

import { RadioGroup } from '../../django-spa/Controls'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'

import type { WidgetProps } from '../../typing'
import { handleUserAction } from '../../common/utils/handleUserAction'
import { getAccessor } from '../utils/dataAccess'
import { useCreateTestId } from '../../django-spa/aspects'

const eventName = EventNameEnum.RADIO_BUTTON_CHOICE
const widgetType = WidgetTypeEnum.ACTION

type RadioButtonElement = {
  uuid: string
  title: string
}

type RadioButtonWidgetProps = WidgetProps & {
  optionLabel: (v: RadioButtonElement) => string
  optionValue: (v: RadioButtonElement) => string
  getSelectedValue: (v: unknown) => RadioButtonElement
}

const RadioButtonWidget = (props: RadioButtonWidgetProps): JSX.Element => {
  const {
    name,
    mainDetailObject,
    containerStore,
    provider,
    style,
    helpText,
    description,
    optionLabel,
    optionValue,
    cacheTime,
    getSelectedValue,
  } = props
  const context = containerStore.getState()
  const effectiveCacheTime = getAccessor(cacheTime, mainDetailObject, context)

  const { dataResourceUrl, content } = useWidgetInitialization({ ...props, context })
  const [elements, setElements] = React.useState<RadioButtonElement[]>(content as RadioButtonElement[])
  const [selectedValue, setSelectedValue] = React.useState<RadioButtonElement | undefined>(undefined)

  React.useEffect(() => {
    if (dataResourceUrl) {
      provider
        .getPage(dataResourceUrl, undefined, undefined, effectiveCacheTime)
        .then(([data, ,]: [Model[], object, object]) => setElements(data as RadioButtonElement[]))
    }
  }, [dataResourceUrl, provider, effectiveCacheTime])

  React.useEffect(() => {
    setSelectedValue(getSelectedValue(context))
  }, [context, getSelectedValue])

  const handleChange = (nextValue: RadioButtonElement | undefined): void => {
    handleUserAction({ ...props, eventName, widgetType, widgetValue: nextValue })
  }

  const { getDataTestId } = useCreateTestId()

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} description={description} {...getDataTestId(props)}>
      <RadioGroup
        getKey={optionValue}
        getLabel={optionLabel}
        getValue={optionValue}
        items={elements}
        onChange={handleChange}
        value={selectedValue}
      />
    </WidgetWrapper>
  )
}

export { RadioButtonWidget }
