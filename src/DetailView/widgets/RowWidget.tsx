import React from 'react'
import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react'
import { Store } from 'effector'

import { getComponentFromCallable } from '../../common/utils/mountComponents'
import { UseTestIdProps, useCreateTestId } from '../../django-spa/aspects'

export interface RowWidgetProps extends Record<string, any>, UseTestIdProps {
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

  const { getDataTestId } = useCreateTestId()

  return (
    <Flex data-name={name} flexWrap="wrap" {...getDataTestId(props)} {...style}>
      {widgets?.map((widgetElement: any) => {
        const { widget, elementWrapperStyle, name: widgetName, ...rest } = widgetElement
        const ComponentToMount = getComponentFromCallable(widget, user, mainDetailObject, context)
        return (
          <Box key={widgetName} name={widgetName} {...generalElementWrapperStyle} {...elementWrapperStyle}>
            <ComponentToMount
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
