import * as React from 'react'
import { mountComponents } from '../../common/utils/mountComponents'

/**
 * Render props.widgets in data-grid by their layout-properties
 * props.widgets: DetailFieldDescription[]
 *
 * @param props
 * @constructor
 */
const ContainerWidget = (props: any): JSX.Element => {
  const {
    setInitialValue,
    submitChange,
    resourceName,
    mainDetailObject,
    provider,
    setMainDetailObject,
    refreshMainDetailObject,
    notifier,
    user,
    analytics,
    googleConfig,
    ViewType,
    containerStore,
    widgets,
  } = props
  return (
    <>
      {mountComponents({
        setInitialValue,
        submitChange,
        resourceName,
        mainDetailObject,
        elements: widgets,
        provider,
        setMainDetailObject,
        refreshMainDetailObject,
        notifier,
        user,
        analytics,
        googleConfig,
        ViewType,
        containerStore,
      })}
    </>
  )
}

export { ContainerWidget }
