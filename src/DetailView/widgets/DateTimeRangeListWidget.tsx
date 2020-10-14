import * as React from 'react'
import * as moment from 'moment'
import { Button } from '@chakra-ui/core'
import styled from 'styled-components'

import { BaseDateTimeRangeWidget } from '../../common/components/BaseDateTimeRangeWidget'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getPayload } from '../utils/dataAccess'
import { getNewDateRange } from '../utils/dateUtils'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'
import type { GenericAccessor, OptionalDate, WidgetProps } from '../../typing'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'

type DateRange = [OptionalDate, OptionalDate]

type DateTimeRangeActionProps = {
  startDate: OptionalDate
  endDate: OptionalDate
  itemIndex: number
  setDateRanges: Function
  dateRanges: DateRange[]
  targetPayload: GenericAccessor
  targetUrl: string
  submitChange: Function
  name: string
}

type DateTimeRangeWidgetProps = WidgetProps & { oneDayInterval?: boolean | undefined; inputCount?: number }

const StyledButton = styled.div`
  float: left;
  margin-right: 5px;
`

const getInputPayload = (dateRanges: DateRange[]): ([string, string] | null)[] => {
  return dateRanges.map((dateRange_: DateRange) => {
    const [dateFrom, dateTo] = dateRange_

    if (dateFrom && dateTo) {
      return [moment(dateFrom).format('YYYY-MM-DDTHH:mm:ss'), moment(dateTo).format('YYYY-MM-DDTHH:mm:ss')]
    }

    return null
  })
}

const AllDayDateTimeRangeAction = (props: DateTimeRangeActionProps): JSX.Element => {
  const {
    startDate,
    endDate,
    itemIndex,
    setDateRanges,
    dateRanges,
    targetPayload,
    targetUrl,
    submitChange,
    name,
  } = props

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
      const newDateRanges = dateRanges

      newDateRanges[itemIndex] = [newStartDate, newEndDate]
      setDateRanges(newDateRanges)

      const widgetPayload = getPayload(getInputPayload(newDateRanges), name, targetPayload)
      submitChange({ url: targetUrl, payload: widgetPayload })
    }
  }

  return (
    <Button variantColor="teal" variant="outline" onClick={handleButtonClick}>
      Весь день
    </Button>
  )
}

const getInitialValue = (inputCount: number): DateRange[] => {
  const initialRange = [null, null]
  const initialValue = []

  for (let elementIndex = 0; elementIndex < inputCount; elementIndex++) {
    initialValue.push(initialRange)
  }

  return initialValue as DateRange[]
}

const DateTimeRangeListWidget = (props: DateTimeRangeWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    targetPayload,
    style,
    submitChange,
    setInitialValue,
    oneDayInterval,
    containerStore,
    inputCount = 1,
  } = props

  const context = containerStore.getState()
  const { targetUrl, content } = useWidgetInitialization({ ...props, context })

  const value = content || getInitialValue(inputCount)

  const [dateRanges, setDateRanges] = React.useState<DateRange[]>(value as DateRange[])

  setInitialValue({ [name]: value })

  const handleChangeDate = (date: OptionalDate, dateKind: string, itemIndex: number): void => {
    const changeValue = date ? moment(date).format('YYYY-MM-DDTHH:mm:ss') : ''

    pushAnalytics({
      eventName: EventNameEnum.DATE_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: changeValue,
      ...props,
    })

    const [startDate, endDate] = dateRanges[itemIndex]
    const [newStartDate, newEndDate] = getNewDateRange(dateKind, date, startDate, endDate, oneDayInterval)

    const newDateRanges = dateRanges
    newDateRanges[itemIndex] = [newStartDate, newEndDate]
    setDateRanges(newDateRanges)

    const widgetPayload = getPayload(getInputPayload(newDateRanges), name, targetPayload)
    submitChange({ url: targetUrl, payload: widgetPayload })
  }

  const handleRemove = (itemIndex: number): void => {
    const newDateRanges = dateRanges.slice()
    newDateRanges.splice(itemIndex, 1)
    if (newDateRanges.length < 1) {
      newDateRanges.push([null, null])
    }
    setDateRanges(newDateRanges)
  }

  const handleAdd = (itemIndex: number): void => {
    const newDateRanges = dateRanges.slice()
    newDateRanges.splice(itemIndex + 1, 0, [null, null])
    setDateRanges(newDateRanges)
  }

  return (
    <WidgetWrapper style={{ ...style, zIndex: 1000 }} helpText={helpText}>
      {dateRanges.map((dateRange: DateRange, itemIndex: number) => {
        const [startDate, endDate] = dateRange

        return (
          <>
            <BaseDateTimeRangeWidget
              startDate={startDate}
              endDate={endDate}
              handleChangeDate={handleChangeDate}
              itemIndex={itemIndex}
            />
            <StyledButton>
              <AllDayDateTimeRangeAction
                startDate={startDate}
                endDate={endDate}
                itemIndex={itemIndex}
                setDateRanges={setDateRanges}
                dateRanges={dateRanges}
                targetPayload={targetPayload}
                targetUrl={targetUrl}
                submitChange={submitChange}
                name={name}
              />
            </StyledButton>
            <StyledButton>
              <Button variantColor="teal" variant="outline" onClick={() => handleRemove(itemIndex)}>
                -
              </Button>
            </StyledButton>
            <StyledButton>
              <Button variantColor="teal" variant="outline" onClick={() => handleAdd(itemIndex)}>
                +
              </Button>
            </StyledButton>
            <br />
            <br />
          </>
        )
      })}
    </WidgetWrapper>
  )
}
export { DateTimeRangeListWidget }
