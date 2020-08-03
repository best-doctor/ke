import * as React from 'react'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'
import type { BaseAnalytic } from 'integration/analytics/base'
import type { BaseProvider } from '../admin/providers'

import { isValidComponent } from './isComponent'

const mountComponents = (
  resource: string,
  object: any,
  adminFields: DetailFieldDescription[],
  provider: BaseProvider,
  setObject: Function,
  notifier: Function,
  user: any,
  analytics: BaseAnalytic | undefined,
  viewType: string
): JSX.Element[] => {
  if (!object) {
    return []
  }

  return adminFields.map((adminElement: DetailFieldDescription) => {
    const { widget, name, layout, widgetAnalytics } = adminElement
    let MyComponent = null

    if (isValidComponent(widget)) {
      MyComponent = widget
    } else {
      MyComponent = widget(user)
    }

    return (
      <MyComponent
        key={name}
        resource={resource}
        detailObject={object}
        data-grid={layout}
        provider={provider}
        setObject={setObject}
        notifier={notifier}
        analytics={analytics}
        widgetAnalytics={widgetAnalytics}
        viewType={viewType}
        {...adminElement}
      />
    )
  })
}

export { mountComponents }
