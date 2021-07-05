import React from 'react'
import { format } from 'date-fns'

import { DateInput } from '@cdk/Controls/DateInput/DateInput'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { handleUserAction } from '../../common/utils/handleUserAction'

import type { OptionalDate, WidgetProps } from '../../typing'

const eventName = EventNameEnum.DATETIME_CHANGE
const widgetType = WidgetTypeEnum.INPUT

type DateWidgetProps = {
  minDate?: Date
  maxDate?: Date
  filterDate?: (dateValue: Date) => boolean
  dateFormat?: string
  className?: string
  isClearable?: boolean
}

/**
 * Render date picker
 *
 * @param props - widget props
 */
const DateWidget = (props: WidgetProps & DateWidgetProps): JSX.Element => {
  const {
    name,
    helpText,
    description,
    style,
    setInitialValue,
    containerStore,
    minDate,
    maxDate,
    filterDate,
    dateFormat = 'dd.MM.yyyy',
    className,
    isClearable,
  } = props

  const context = containerStore.getState()
  const { targetUrl, content, isRequired } = useWidgetInitialization({ ...props, context })

  const contentDate = content ? new Date(content as string) : null
  setInitialValue({ [name]: content })

  const handleChange = (value: OptionalDate): void => {
    const widgetValue = value ? format(value, 'yyyy-MM-dd') : ''

    handleUserAction({ ...props, widgetValue, targetUrl, eventName, widgetType })
  }

  return (
    <WidgetWrapper
      name={name}
      style={{ ...style, zIndex: 1000 }}
      helpText={helpText}
      description={description}
      required={isRequired}
    >
      <DateInput
        value={contentDate}
        onChange={(value: Date) => handleChange(value)}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        filterDate={filterDate}
        className={className}
        isClearable={isClearable}
      />
    </WidgetWrapper>
  )
}

export { DateWidget }
