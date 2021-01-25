import * as React from 'react'
import { mountComponents } from '../../common/utils/mountComponents'

const ContainerWidget = (props: any): JSX.Element => {
  const {
    setInitialValue,
    submitChange,
    resourceName,
    mainDetailObject,
    provider,
    setMainDetailObject,
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
