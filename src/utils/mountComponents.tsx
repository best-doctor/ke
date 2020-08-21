import * as React from 'react'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'
import type { BaseAnalytic } from 'integration/analytics/base'
import type { BaseProvider } from '../admin/providers'
import type { BaseNotifier } from './notifier'

import { isValidComponent } from './isComponent'

type mountComponentsKwargs = {
  setInitialValue: Function
  submitChange: Function
  resourceName: string
  object: object
  elements: DetailFieldDescription[]
  provider: BaseProvider
  setObject: Function
  notifier: BaseNotifier
  user: object
  analytics: BaseAnalytic | undefined
  ViewType: string
}

const getComponentFromCallable = (widget: JSX.Element | Function, user: object): any => {
  // Widget can be defined as callable. In this case, we inject some payload to arrow function.
  let ComponentToMount = null

  if (isValidComponent(widget)) {
    ComponentToMount = widget
  } else {
    ComponentToMount = (widget as Function)(user)
  }

  return ComponentToMount
}

const mountComponents = ({
  setInitialValue,
  submitChange,
  resourceName,
  object,
  elements,
  provider,
  setObject,
  notifier,
  user,
  analytics,
  ViewType,
}: mountComponentsKwargs): JSX.Element[] => {
  return elements.map((adminElement: DetailFieldDescription) => {
    const { widget, name, layout, widgetAnalytics } = adminElement

    const ComponentToMount = getComponentFromCallable(widget, user)

    return (
      <ComponentToMount
        key={name}
        resource={resourceName}
        detailObject={object}
        data-grid={layout}
        provider={provider}
        setObject={setObject}
        notifier={notifier}
        analytics={analytics}
        widgetAnalytics={widgetAnalytics}
        viewType={ViewType}
        setInitialValue={setInitialValue}
        submitChange={submitChange}
        {...adminElement}
      />
    )
  })
}

export { mountComponents }
