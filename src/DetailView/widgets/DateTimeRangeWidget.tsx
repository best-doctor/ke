import React from 'react'
import { Button } from '@chakra-ui/react'
import { format } from 'date-fns'

import { BaseDateTimeRangeWidget } from '../../common/components/BaseDateTimeRangeWidget'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getPayload } from '../utils/dataAccess'
import { getNewDateRange } from '../utils/dateUtils'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'
import type { OptionalDate, WidgetProps } from '../../typing'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'

type DateTimeRangeWidgetProps = WidgetProps & { oneDayInterval?: boolean | undefined }

const getInputPayload = (dateFrom: OptionalDate, dateTo: OptionalDate): [string, string] | null => {
  if (dateFrom && dateTo) {
    return [format(dateFrom, "yyyy-MM-dd'T'HH:mm:ss"), format(dateTo, "yyyy-MM-dd'T'HH:mm:ss")]
  }
  return null
}

/**
 * Render date-range picker
 * Waits for data type: [string, string], where string - ISO Date
 *
 * props.oneDayInterval: boolean - restrict date range to one day length
 *
 * @param props - widget props
 */
const DateTimeRangeWidget = (props: DateTimeRangeWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    description,
    targetPayload,
    style,
    submitChange,
    setInitialValue,
    oneDayInterval,
    containerStore,
  } = props

  const context = containerStore.getState()
  let iStartDate = null
  let iEndDate = null

  const { targetUrl, content } = useWidgetInitialization({ ...props, context })
  if (content) {
    ;[iStartDate, iEndDate] = content as [string, string]
  }
  const [startDate, setStartDate] = React.useState<OptionalDate>(iStartDate ? new Date(iStartDate) : null)
  const [endDate, setEndDate] = React.useState<OptionalDate>(iEndDate ? new Date(iEndDate) : null)

  setInitialValue({ [name]: content })

  const handleChangeDate = (date: OptionalDate, dateKind: string, save = true): void => {
    const changeValue = date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : ''

    pushAnalytics({
      eventName: EventNameEnum.DATE_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: changeValue,
      objectForAnalytics: props.mainDetailObject,
      ...props,
    })

    const [newStartDate, newEndDate] = getNewDateRange(dateKind, date, startDate, endDate, oneDayInterval)

    setStartDate(newStartDate)
    setEndDate(newEndDate)

    if (save) {
      const widgetPayload = getPayload(getInputPayload(newStartDate, newEndDate), name, targetPayload)
      submitChange({ url: targetUrl, payload: widgetPayload })
    }
  }

  const handleButtonClick = (): void => {
    let newStartDate = null
    let newEndDate = null

    if (startDate) {
      newStartDate = new Date(startDate.getTime())
      newStartDate.setHours(0, 0, 0, 0)
    }
    if (endDate) {
      newEndDate = new Date(endDate.getTime())
      newEndDate.setHours(23, 59, 0, 0)
    }
    if (startDate !== newStartDate || endDate !== newEndDate) {
      setStartDate(newStartDate)
      setEndDate(newEndDate)
      const widgetPayload = getPayload(getInputPayload(newStartDate, newEndDate), name, targetPayload)
      submitChange({ url: targetUrl, payload: widgetPayload })
    }
  }
  return (
    <WidgetWrapper name={name} style={{ ...style, zIndex: 1000 }} helpText={helpText} description={description}>
      <BaseDateTimeRangeWidget startDate={startDate} endDate={endDate} handleChangeDate={handleChangeDate} />
      <Button colorScheme="teal" variant="outline" onClick={() => handleButtonClick()}>
        Весь день
      </Button>
    </WidgetWrapper>
  )
}
export { DateTimeRangeWidget }
