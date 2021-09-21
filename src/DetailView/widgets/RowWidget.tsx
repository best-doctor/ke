import React from 'react'
import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react'
import { Store } from 'effector'

import { getComponentFromCallable } from '../../common/utils/mountComponents'

export interface RowWidgetProps extends Record<string, any> {
  widgets: Array<any>
  style?: FlexProps
  elementWrapperStyle?: BoxProps
}

const RowWidget = (props: RowWidgetProps): JSX.Element => {
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
    ViewType,
    containerStore,
    widgets,
    name,
    style,
    setCurrentState,
    elementWrapperStyle: generalElementWrapperStyle,
  } = props

  const context = (containerStore as Store<object>).getState()

  return (
    <Flex data-name={name} flwxWrap="wrap" {...style}>
      {widgets?.map((widgetElement: any) => {
        const { widget, elementWrapperStyle, ...rest } = widgetElement
        const ComponentToMount = getComponentFromCallable(widget, user, mainDetailObject, context)
        return (
          <Box {...generalElementWrapperStyle} {...elementWrapperStyle}>
            <ComponentToMount
              key={name}
              resource={resourceName}
              resourceName={resourceName}
              mainDetailObject={mainDetailObject}
              provider={provider}
              setMainDetailObject={setMainDetailObject}
              refreshMainDetailObject={refreshMainDetailObject}
              notifier={notifier}
              analytics={analytics}
              viewType={ViewType}
              setInitialValue={setInitialValue}
              submitChange={submitChange}
              containerStore={containerStore}
              setCurrentState={setCurrentState}
              {...rest}
            />
          </Box>
        )
      })}
    </Flex>
  )
}

export { RowWidget }