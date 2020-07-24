import * as React from 'react'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'
import type { BaseProvider } from '../admin/providers'

import { isValidComponent } from './isComponent'

const mountComponents = (
  object: any,
  adminFields: DetailFieldDescription[],
  provider: BaseProvider,
  setObject: Function,
  notifier: Function,
  user: any
): JSX.Element[] => {
  if (!object) {
    return []
  }

  return adminFields.map((adminElement: DetailFieldDescription) => {
    const { widget, name, layout } = adminElement
    let MyComponent = null

    if (isValidComponent(widget)) {
      MyComponent = widget
    } else {
      MyComponent = widget(user)
    }

    return (
      <MyComponent
        key={name}
        detailObject={object}
        data-grid={layout}
        provider={provider}
        setObject={setObject}
        notifier={notifier}
        {...adminElement}
      />
    )
  })
}

export { mountComponents }
