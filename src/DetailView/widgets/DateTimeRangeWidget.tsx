import * as React from 'react'
import * as moment from 'moment'
import { Button } from '@chakra-ui/core'

import { BaseDateTimeRangeWidget } from '../../common/components/BaseDateTimeRangeWidget'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getData, getWidgetContent, getPayload } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'
import type { BaseProvider } from '../../admin/providers'
import type { GenericAccessor } from '../../typing'
import type { BaseAnalytic } from '../../integration/analytics/base'
import type { BaseNotifier } from '../../common/notifier'

type DateTimeRangeWidgetProps = {
  name: string
  helpText: string
  resource: string
  detailObject: any
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
  oneDayInterval?: boolean | undefined
}

const DateTimeRangeWidget = (props: DateTimeRangeWidgetProps): JSX.Element => {
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
    oneDayInterval,
  } = props
  let iStartDate = null
  let iEndDate = null

  const targetUrl = getData(dataTarget, detailObject) || detailObject.url
  const content = getWidgetContent(name, detailObject, displayValue)
  if (content) {
    [iStartDate, iEndDate] = content
  }
  const [startDate, setStartDate] = React.useState<Date | null>(iStartDate ? new Date(iStartDate) : null)
  const [endDate, setEndDate] = React.useState<Date | null>(iEndDate ? new Date(iEndDate) : null)
  setInitialValue({ [name]: content })

  const datesAreOnSameDay = (first: Date, second: Date): boolean =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()

  const getInputPayload = (dateFrom: Date | null, dateTo: Date | null): [string, string] | null => {
    if (dateFrom && dateTo) {
      return [moment(dateFrom).format('YYYY-MM-DDTHH:mm:ss'), moment(dateTo).format('YYYY-MM-DDTHH:mm:ss')]
    }
    return null
  }

  const handleChangeDate = (date: Date | null, dateKind: string, save = true): void => {
    const changeValue = date ? moment(date).format('YYYY-MM-DDTHH:mm:ss') : ''
    pushAnalytics({
      eventName: EventNameEnum.DATE_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: changeValue,
      ...props,
    })

    let newStartDate = null
    let newEndDate = null

    if (dateKind === 'start') {
      newStartDate = date
      newEndDate = endDate || date
    } else {
      newStartDate = startDate || date
      newEndDate = date
    }

    if (newStartDate && newEndDate) {
      if ((oneDayInterval && !datesAreOnSameDay(newStartDate, newEndDate)) || newEndDate < newStartDate) {
        if (dateKind === 'start') {
          newEndDate = newStartDate
        } else {
          newStartDate = newEndDate
        }
      }
    }

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
    <WidgetWrapper style={{ ...style, zIndex: 1000 }} helpText={helpText}>
      <BaseDateTimeRangeWidget
        startDate={startDate}
        endDate={endDate}
        handleChangeDate={handleChangeDate}
        helpText={helpText}
        style={style}
      />
      <Button variantColor="teal" variant="outline" onClick={() => handleButtonClick()}>
        Весь день
      </Button>
    </WidgetWrapper>
  )
}
export { DateTimeRangeWidget }
