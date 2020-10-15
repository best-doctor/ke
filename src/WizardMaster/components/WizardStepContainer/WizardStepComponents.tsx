import * as React from 'react'
import { useStore } from 'effector-react'
import * as GridLayout from 'react-grid-layout'

import type { DetailFieldDescription } from 'admin/fields/FieldDescription'
import { setInitialValue } from '../../controllers'
import { containerStore } from '../../store'

import { mountComponents } from '../../../common/utils/mountComponents'
import type { BaseNotifier } from '../../../common/notifier'
import type { BaseProvider } from '../../../admin/providers/index'
import type { BaseAnalytic } from '../../../integration/analytics/base'
import type { WizardObject } from '../../../typing'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)

type WizardStepComponentsProps = {
  elements: DetailFieldDescription[]
  resourceName: string
  provider: BaseProvider
  mainWizardObject: WizardObject
  setMainDetailObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic | undefined
  user: object
  ViewType: string
  submitChange: Function
}

const WizardStepComponents = (props: WizardStepComponentsProps): JSX.Element => {
  const state = useStore(containerStore)

  const {
    elements,
    resourceName,
    provider,
    mainWizardObject,
    setMainDetailObject,
    notifier,
    analytics,
    user,
    ViewType,
    submitChange,
  } = props

  React.useEffect(() => {}, [state])

  return (
    <ReactGridLayout key="wizardStepComponentsLayout" className="layout" cols={12} rowHeight={30}>
      {mountComponents({
        setInitialValue,
        submitChange,
        resourceName,
        mainDetailObject: mainWizardObject,
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

export { WizardStepComponents }
