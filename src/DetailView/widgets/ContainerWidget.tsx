import * as React from 'react'
import { Box } from '@chakra-ui/core'
import { mountComponents } from '../../common/utils/mountComponents'

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
    name,
  } = props
  return (
    <Box data-name={name}>
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
    </Box>
  )
}

export { ContainerWidget }
