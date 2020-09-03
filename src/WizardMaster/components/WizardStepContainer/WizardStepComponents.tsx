import * as React from 'react'
import * as GridLayout from 'react-grid-layout'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'
import { containerStore } from '../../store'
import { setInitialValue } from '../../controllers'
import { clearStorage } from '../../utils'
import { mountComponents } from '../../../common/utils/mountComponents'
import type { BaseNotifier } from '../../../common/notifier'
import type { BaseProvider } from '../../../admin/providers/index'
import type { BaseAnalytic } from '../../../integration/analytics/base'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)

type WizardStepComponentsProps = {
  elements: DetailFieldDescription[]
  resourceName: string
  provider: BaseProvider
  object: object
  setObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic | undefined
  user: object
  ViewType: string
  submitChange: Function
}

const WizardStepComponents = (props: WizardStepComponentsProps): JSX.Element => {
  const {
    elements,
    resourceName,
    provider,
    object,
    setObject,
    notifier,
    analytics,
    user,
    ViewType,
    submitChange,
  } = props

  React.useEffect(() => {
    return () => {
      clearStorage(elements, containerStore.getState())
    }
  })

  return (
    <ReactGridLayout key="wizardStepComponentsLayout" className="layout" cols={12} rowHeight={30}>
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

export { WizardStepComponents }
