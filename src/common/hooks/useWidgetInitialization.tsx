import { getAccessorWithDefault, getData, getWidgetContent } from '../../DetailView/utils/dataAccess'

import type { GenericAccessor, DetailObject, WidgetProps } from '../../typing'

type InitializationParameters = {
  context: object // store for wizards and common detail view widgets
}

type InitializationArguments = WidgetProps & InitializationParameters

type InitializedWidgetAttributes = {
  targetUrl: string
  content: object | string
  dataResourceUrl: string
  isRequired: boolean
}

const getWidgetTargetUrl = (dataTarget: GenericAccessor, detailObject: DetailObject): string =>
  /*
    Get the URL to which the data entered by the user will be submitted
  */
  getData(dataTarget, detailObject) || detailObject.url

const useWidgetInitialization = (initializationArguments: InitializationArguments): InitializedWidgetAttributes => {
  const { dataTarget, mainDetailObject, name, displayValue, context, dataSource, required } = initializationArguments
  const targetUrl = getWidgetTargetUrl(dataTarget, mainDetailObject)
  const content = getWidgetContent(name, mainDetailObject, displayValue, context) || ''
  const dataResourceUrl = getData(dataSource, mainDetailObject, context)
  const isRequired = getAccessorWithDefault(required, mainDetailObject, context, false)

  return {
    targetUrl,
    content,
    dataResourceUrl,
    isRequired,
  }
}

export { useWidgetInitialization }
