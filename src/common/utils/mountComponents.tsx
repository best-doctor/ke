import * as React from 'react'
import { get } from 'lodash'
// eslint-disable-next-line
// @ts-ignore
import { Row, getColumnProps } from 'react-flexbox-grid'

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

  elements.sort((firstElement, secondElement) => {
    const firstY = get(firstElement, 'layout.y')
    const secondY = get(secondElement, 'layout.y')
    const firstX = get(firstElement, 'layout.x')
    const secondX = get(secondElement, 'layout.x')

    if (firstY === secondY) {
      return firstX > secondX ? 1 : -1
    }
    return firstY > secondY ? 1 : -1
  })

  const rows = []
  let columns = []
  let lastRow = null

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    const currentRow = get(element, 'layout.y')
    if (currentRow !== lastRow) {
      if (columns.length > 0) {
        rows.push(columns)
        columns = []
      }
    }
    columns.push(element)
    lastRow = currentRow
  }
  if (columns) {
    rows.push(columns)
  }

  return rows.map((rowColumns) => {
    return (
      <Row>
        {rowColumns.map((adminElement: DetailFieldDescription) => {
          const { widget, name, layout, widgetAnalytics } = adminElement

          const ComponentToMount = getComponentFromCallable(widget, user)
          const colProps = getColumnProps(layout)

          return (
            <div className={colProps.className}>
              <ComponentToMount
                key={name}
                resource={resourceName}
                resourceName={resourceName}
                mainDetailObject={mainDetailObject}
                // data-grid={layout}
                provider={provider}
                setMainDetailObject={setMainDetailObject}
                notifier={notifier}
                analytics={analytics}
                widgetAnalytics={widgetAnalytics}
                viewType={ViewType}
                setInitialValue={setInitialValue}
                submitChange={submitChange}
                containerStore={containerStore}
                {...adminElement}
              />
            </div>
          )
        })}
      </Row>
    )
  })
}

export { mountComponents }
