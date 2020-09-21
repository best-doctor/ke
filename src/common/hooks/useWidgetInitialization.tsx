import { getData, getWidgetContent } from '../../DetailView/utils/dataAccess'

import type { GenericAccessor, DetailObject, WidgetProps } from '../../typing'

type InitializationParameters = {
  contentType: string | undefined
  context: object
}

type InitializationArguments = WidgetProps & InitializationParameters

type InitializedWidgetAttributes = {
  targetUrl: string
  content: object | string
  dataResourceUrl: string
}

const getWidgetTargetUrl = (dataTarget: GenericAccessor, detailObject: DetailObject): string => {
  /*
    Get the URL to which the data entered by the user will be submitted
  */
  return getData(dataTarget, detailObject) || detailObject.url
}

const useWidgetInitialization = (initializationArguments: InitializationArguments): InitializedWidgetAttributes => {
  const { dataTarget, detailObject, contentType, name, displayValue, context, dataSource } = initializationArguments

  const targetUrl = getWidgetTargetUrl(dataTarget, detailObject)
  const content = getWidgetContent(name, detailObject, displayValue, context, contentType) || ''
  const dataResourceUrl = getData(dataSource, context)

  return {
    targetUrl,
    content,
    dataResourceUrl,
  }
}

export { useWidgetInitialization }
