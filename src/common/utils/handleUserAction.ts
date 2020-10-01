import type { WidgetProps } from '../../typing'
import { getPayload } from '../../DetailView/utils/dataAccess'
import { pushAnalytics } from '../../integration/analytics'

type ActionHandlerArguments = WidgetProps & {
  targetUrl?: string | undefined
  widgetValue: string | object | undefined
  widgetType: string
  eventName: string
}

const handleUserAction = (actionHandlerArguments: ActionHandlerArguments): void => {
  /*
    This function encapsulates general logic for processing a user action.

    This logic includes:
      * receiving the payload in the desired format for sending to the backend or saving to the store
      * sending analytics
      * sending payload to backend or saving to store
  */
  const {
    name,
    targetPayload,
    submitChange,
    targetUrl,
    widgetValue,
    eventName,
    widgetType,
    analytics,
    widgetAnalytics,
    detailObject,
    resource,
    viewType,
  } = actionHandlerArguments
  const widgetPayload = getPayload(widgetValue, name, targetPayload)

  pushAnalytics({
    eventName,
    widgetName: name,
    widgetType,
    analytics,
    widgetAnalytics,
    value: widgetValue,
    detailObject,
    resource,
    name,
    viewType,
  })

  submitChange({ url: targetUrl, payload: widgetPayload })
}

export { handleUserAction }
