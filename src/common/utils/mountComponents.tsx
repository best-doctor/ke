import * as React from 'react'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'
import type { BaseAnalytic } from 'integration/analytics/base'
import type { BaseProvider } from '../../admin/providers'
import type { BaseNotifier } from '../notifier'
import type { DetailObject, GenericAccessor } from '../../typing'

import { isValidComponent } from './isComponent'

type mountComponentsKwargs = {
  setInitialValue: Function
  submitChange: Function
  resourceName: string
  mainDetailObject: DetailObject
  elements: DetailFieldDescription[]
  provider: BaseProvider
  setMainDetailObject: Function
  notifier: BaseNotifier
  user: object
  analytics: BaseAnalytic | undefined
  ViewType: string
  containerStore?: object | undefined
}

const getComponentFromCallable = (widget: GenericAccessor, user: object): any => {
  // Widget can be defined as callable. In this case, we inject some payload to arrow function.
  let ComponentToMount = null

  if (isValidComponent(widget as JSX.Element)) {
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
  mainDetailObject,
  elements,
  provider,
  setMainDetailObject,
  notifier,
  user,
  analytics,
  ViewType,
  containerStore,
}: mountComponentsKwargs): JSX.Element[] => {
  /*
    Mounts widgets, which are described in DetailFieldDescription format.

    It passes all necessary properties to widget object.
    They are used in internal ke widgets and also can be used on client side.
    Type described in `typing.ts::WidgetProps`
  */

  return elements.map((adminElement: DetailFieldDescription) => {
    const { widget, name, layout, widgetAnalytics } = adminElement

    const ComponentToMount = getComponentFromCallable(widget, user)

    return (
      <ComponentToMount
        key={name}
        resource={resourceName}
        detailObject={mainDetailObject}
        data-grid={layout}
        provider={provider}
        setObject={setMainDetailObject}
        notifier={notifier}
        analytics={analytics}
        widgetAnalytics={widgetAnalytics}
        viewType={ViewType}
        setInitialValue={setInitialValue}
        submitChange={submitChange}
        containerStore={containerStore}
        {...adminElement}
      />
    )
  })
}

export { mountComponents }
