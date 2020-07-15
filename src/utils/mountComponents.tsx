import * as React from 'react'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'
import type { BaseProvider } from '../admin/providers'

const mountComponents = (
  object: any,
  adminFields: DetailFieldDescription[],
  provider: BaseProvider,
  setObject: Function,
  notifier: Function
): JSX.Element[] => {
  if (!object) {
    return []
  }

  return adminFields.map((adminElement: DetailFieldDescription) => {
    const { widget: MyComponent, name, layout } = adminElement

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
