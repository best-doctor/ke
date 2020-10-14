import * as React from 'react'
import * as GridLayout from 'react-grid-layout'
import type { DetailFieldDescription } from 'admin/fields/FieldDescription'

import type { BaseProvider } from 'index'
import type { BaseNotifier } from 'common/notifier'
import type { BaseAnalytic } from 'integration/analytics'
import type { DetailObject, FieldsTypeInAdminClass } from 'typing'

import { containerStore } from './store'
import { initDetailViewControllers } from './controllers'
import { mountComponents } from '../common/utils/mountComponents'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)

type MountDetailFieldsArgs = {
  resourceName: string
  mainDetailObject: DetailObject
  elements: DetailFieldDescription[]
  provider: BaseProvider
  setMainDetailObject: Function
  notifier: BaseNotifier
  user: object
  analytics: BaseAnalytic | undefined
  ViewType: string
  elementsKey: FieldsTypeInAdminClass
}

const mountDetailFields = ({
  resourceName,
  mainDetailObject,
  elements,
  provider,
  setMainDetailObject,
  notifier,
  user,
  analytics,
  ViewType,
  elementsKey,
}: MountDetailFieldsArgs): JSX.Element => {
  /*
    Function mounts widgets for Detail View.

    Widgets of Detail View type do not use store,
    but immediately send data entered (or selected) by the user
    to the backend (if the widget assumes interaction with the backend)
  */
  const [setInitialValue, submitChange] = initDetailViewControllers(provider, setMainDetailObject, notifier)

  return (
    <ReactGridLayout key={elementsKey} className="layout" cols={12} rowHeight={30}>
      {mountComponents({
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
      })}
    </ReactGridLayout>
  )
}

export { mountDetailFields }
