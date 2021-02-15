import * as React from 'react'
// eslint-disable-next-line
// @ts-ignore
import { Row, getColumnProps } from 'react-flexbox-grid'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'
import type { BaseAnalytic } from 'integration/analytics/base'
import type { Provider } from '../../admin/providers/interfaces'
import type { BaseNotifier } from '../notifier'
import type { DetailObject, GenericAccessor } from '../../typing'

import { isValidComponent } from './isComponent'
import type { GoogleConfig } from '../../integration/google'
import { get } from './get'

type mountComponentsKwargs = {
  setInitialValue: Function
  submitChange: Function
  resourceName: string
  mainDetailObject: DetailObject
  elements: DetailFieldDescription[]
  provider: Provider
  setMainDetailObject: Function
  refreshMainDetailObject: Function
  notifier: BaseNotifier
  user: object
  analytics: BaseAnalytic | undefined
  googleConfig: GoogleConfig | undefined
  ViewType: string
  containerStore?: object | undefined
}

const getComponentFromCallable = (widget: GenericAccessor, user: object, detailObject: DetailObject): any => {
  // Widget can be defined as callable. In this case, we inject some payload to arrow function.
  let ComponentToMount = null

  if (isValidComponent(widget as JSX.Element)) {
    ComponentToMount = widget
  } else {
    ComponentToMount = (widget as Function)(user, detailObject)
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
  refreshMainDetailObject,
  notifier,
  user,
  analytics,
  googleConfig,
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
    const firstY = get(firstElement, 'layout.y') as number
    const secondY = get(secondElement, 'layout.y') as number
    const firstX = get(firstElement, 'layout.x') as number
    const secondX = get(secondElement, 'layout.x') as number

    if (firstY === secondY) {
      return firstX > secondX ? 1 : -1
    }
    return firstY > secondY ? 1 : -1
  })

  const rows = []
  let columns = []
  let lastRow = null
  let lastColEnd = 1

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    const currentRow = get(element, 'layout.y', 1) as number
    const currentCol = get(element, 'layout.x', 1) as number
    const currentWidth = get(element, 'layout.w', 12) as number

    if (currentRow !== lastRow) {
      if (columns.length > 0) {
        rows.push(columns)
        columns = []
        lastColEnd = 1
      }
    }

    element.layout.md = get(element, 'layout.md', currentWidth) as number
    element.layout.xs = get(element, 'layout.xs', 12) as number
    element.layout.xsOffset = get(element, 'layout.xsOffset', 0) as number
    element.layout.mdOffset = get(element, 'layout.mdOffset', currentCol - lastColEnd) as number

    columns.push(element)
    lastColEnd = currentCol + currentWidth
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

          const ComponentToMount = getComponentFromCallable(widget, user, mainDetailObject)
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
                refreshMainDetailObject={refreshMainDetailObject}
                notifier={notifier}
                analytics={analytics}
                googleConfig={googleConfig}
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
