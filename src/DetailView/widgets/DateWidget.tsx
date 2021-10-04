import React from 'react'
import { format } from 'date-fns'

import { DateInput } from '../../django-spa/Controls'
import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { handleUserAction } from '../../common/utils/handleUserAction'

import type { OptionalDate, WidgetProps } from '../../typing'
import { useTestId } from '../../django-spa/aspects/test-id'

const eventName = EventNameEnum.DATETIME_CHANGE
const widgetType = WidgetTypeEnum.INPUT

type DateWidgetAdditionalProps = {
  minDate?: Date
  maxDate?: Date
  filterDate?: (dateValue: Date) => boolean
  dateFormat?: string
  className?: string
  isClearable?: boolean
  wrapperClassName?: string
}

export type DateWidgetProps = WidgetProps & DateWidgetAdditionalProps

/**
 * Render date picker
 *
 * @param props - widget props
 */
const DateWidget = (props: DateWidgetProps): JSX.Element => {
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
    wrapperClassName,
  } = props

  const context = containerStore.getState()
  const { targetUrl, content, isRequired } = useWidgetInitialization({ ...props, context })

  const contentDate = content ? new Date(content as string) : null
  setInitialValue({ [name]: content })

  const handleChange = (value: OptionalDate): void => {
    const widgetValue = value ? format(value, 'yyyy-MM-dd') : ''

    handleUserAction({ ...props, widgetValue, targetUrl, eventName, widgetType })
  }

  const dataTestId = useTestId(props)
  return (
    <WidgetWrapper
      data-test-id={dataTestId}
      name={name}
      style={{ ...style, zIndex: 1000 }}
      helpText={helpText}
      description={description}
      required={isRequired}
    >
      <DateInput
        value={contentDate}
        onChange={(value: OptionalDate) => handleChange(value)}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        filterDate={filterDate}
        className={className}
        isClearable={isClearable}
        wrapperClassName={wrapperClassName}
      />
    </WidgetWrapper>
  )
}

export { DateWidget }
