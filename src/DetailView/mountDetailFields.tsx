import * as React from 'react'
import * as GridLayout from 'react-grid-layout'
import type { DetailFieldDescription } from 'admin/fields/FieldDescription'

import type { BaseProvider } from 'index'
import type { BaseNotifier } from 'common/notifier'
import type { BaseAnalytic } from 'integration/analytics'

import { initDetailViewControllers } from './controllers'
import { mountComponents } from '../common/utils/mountComponents'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)

type MountDetailFieldsArgs = {
  resourceName: string
  object: object
  elements: DetailFieldDescription[]
  provider: BaseProvider
  setObject: Function
  notifier: BaseNotifier
  user: object
  analytics: BaseAnalytic | undefined
  ViewType: string
  elementsKey: string
}

const mountDetailFields = ({
  resourceName,
  object,
  elements,
  provider,
  setObject,
  notifier,
  user,
  analytics,
  ViewType,
  elementsKey,
}: MountDetailFieldsArgs): JSX.Element => {
  const [setInitialValue, submitChange] = initDetailViewControllers(provider, setObject, notifier)

  return (
    <ReactGridLayout key={elementsKey} className="layout" cols={12} rowHeight={30}>
      {mountComponents({
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
      })}
    </ReactGridLayout>
  )
}

export { mountDetailFields }
