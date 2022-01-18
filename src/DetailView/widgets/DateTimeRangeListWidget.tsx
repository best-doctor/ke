import React from 'react'
import { Button } from '@chakra-ui/react'
import styled from 'styled-components'
import { format } from 'date-fns'

import { BaseDateTimeRangeWidget } from '../../common/components/BaseDateTimeRangeWidget'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getPayload } from '../utils/dataAccess'
import { getNewDateRange } from '../utils/dateUtils'
import { pushAnalytics, EventNameEnum, WidgetTypeEnum } from '../../integration/analytics'
import type { GenericAccessor, OptionalDate, WidgetProps } from '../../typing'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { useCreateTestId } from '../../django-spa/aspects'

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

export type DateTimeRangeWidgetProps = WidgetProps & { oneDayInterval?: boolean | undefined; inputCount?: number }

const StyledButton = styled.div`
  float: left;
  margin-right: 5px;
`

const StyledDateTimeRangeListContainer = styled.div`
  overflow: hidden;
  & > div.date-time-list-item + div.date-time-list-item {
    margin-top: 8px;
  }
`

const StyledDateTimeRangeListItem = styled.div`
  overflow: hidden;
`

const getInputPayload = (dateRanges: DateRange[]): ([string, string] | null)[] =>
  dateRanges.map((dateRange_: DateRange) => {
    const [dateFrom, dateTo] = dateRange_

    if (dateFrom && dateTo) {
      return [format(dateFrom, "yyyy-MM-dd'T'HH:mm:ss"), format(dateTo, "yyyy-MM-dd'T'HH:mm:ss")]
    }

    return null
  })

const AllDayDateTimeRangeAction = (props: DateTimeRangeActionProps): JSX.Element => {
  const { startDate, endDate, itemIndex, setDateRanges, dateRanges, targetPayload, targetUrl, submitChange, name } =
    props

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
    <Button colorScheme="brand" variant="outline" onClick={handleButtonClick}>
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

/**
 * Render list of datetime range widgets. Suppose to use for schedule modify.
 *
 * Waits for data type: [string, string][] , where string - ISO Date
 *
 * props.oneDayInterval: boolean - restrict date range to one day length
 *
 * @param props - widget props
 */
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
  const { targetUrl, content, widgetDescription } = useWidgetInitialization({ ...props, context })

  const value = content || getInitialValue(inputCount)

  const [dateRanges, setDateRanges] = React.useState<DateRange[]>(value as DateRange[])

  setInitialValue({ [name]: value })

  const handleChangeDate = (date: OptionalDate, dateKind: string, itemIndex: number): void => {
    const changeValue = date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : ''

    pushAnalytics({
      eventName: EventNameEnum.DATE_CHANGE,
      widgetType: WidgetTypeEnum.INPUT,
      value: changeValue,
      objectForAnalytics: props.mainDetailObject,
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

  const { getDataTestId } = useCreateTestId()
  return (
    <WidgetWrapper
      name={name}
      style={{ ...style, zIndex: 1000 }}
      helpText={helpText}
      description={widgetDescription}
      {...getDataTestId(props)}
    >
      <StyledDateTimeRangeListContainer className="date-time-list-container">
        {dateRanges.map((dateRange: DateRange, itemIndex: number) => {
          const [startDate, endDate] = dateRange

          return (
            <StyledDateTimeRangeListItem className="date-time-list-item" key={`${startDate}-${endDate}`}>
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
                <Button colorScheme="brand" variant="outline" onClick={() => handleRemove(itemIndex)}>
                  -
                </Button>
              </StyledButton>
              <StyledButton>
                <Button colorScheme="brand" variant="outline" onClick={() => handleAdd(itemIndex)}>
                  +
                </Button>
              </StyledButton>
            </StyledDateTimeRangeListItem>
          )
        })}
      </StyledDateTimeRangeListContainer>
    </WidgetWrapper>
  )
}
export { DateTimeRangeListWidget, StyledDateTimeRangeListContainer }
