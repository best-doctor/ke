import React from 'react'
import styled from '@emotion/styled'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type BaseDateTimeRangeWidgetProps = {
  startDate: Date | null
  endDate: Date | null
  handleChangeDate: Function
  itemIndex?: number | undefined
}

const StyleDateTime = styled.div`
  .styled-date-time {
    border-width: 1px;
    border-color: #cbd5e0;
    border-radius: 0.25rem;
    padding: 3px;
    height: 40px;
    width: 150px;
  }
  .react-datepicker-popper {
    z-index: 1001 !important;
  }
  .react-datepicker__close-icon {
    height: 40px;
  }
  .react-datepicker__close-icon::after {
    color: #cccccc;
    background-color: transparent;
    font-size: 24px;
  }
`

const StyleDateTimeItem = styled.div`
  width: 150px;
  height: 40px;
  float: left;
  margin-right: 5px;
`

const StyleItemSeparator = styled.div`
  width: 15px;
  height: 40px;
  float: left;
  text-align: center;
  padding-top: 10px;
  margin-right: 5px;
`

const BaseDateTimeRangeWidget = (props: BaseDateTimeRangeWidgetProps): JSX.Element => {
  const { startDate, endDate, handleChangeDate, itemIndex = 0 } = props

  return (
    <StyleDateTime>
      <StyleDateTimeItem>
        <DatePicker
          className="styled-date-time"
          selected={startDate}
          onChange={(value: Date) => handleChangeDate(value, 'start', itemIndex)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
        />
      </StyleDateTimeItem>
      <StyleItemSeparator> - </StyleItemSeparator>
      <StyleDateTimeItem>
        <DatePicker
          className="styled-date-time"
          selected={endDate}
          onChange={(value: Date) => handleChangeDate(value, 'end', itemIndex)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
        />
      </StyleDateTimeItem>
    </StyleDateTime>
  )
}

export { BaseDateTimeRangeWidget, StyleDateTime }
