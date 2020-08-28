import * as React from 'react'
import { Button } from '@chakra-ui/core'

import { submitChange } from '../controllers'
import { WizardContainer } from './WizardContainer'
import { clearInitialObjectState } from '../utils'

import type { BaseNotifier } from '../../common/notifier'
import type { BaseProvider } from '../../admin/providers/index'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'
import type { BaseWizard } from '../interfaces'
import type { BaseAnalytic } from '../../integration/analytics/base'

type WizardProps = {
  resourceName: string
  wizard: BaseWizard
  provider: BaseProvider
  object: object
  setObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic | undefined
  ViewType: string
  user: object
  style?: object
}

const sendPushAnalytics = (resourceName: string, widgetName: string, props: WizardProps): void => {
  pushAnalytics({
    eventName: EventNameEnum.BUTTON_CLICK,
    widgetType: WidgetTypeEnum.ACTION,
    widgetName,
    viewType: 'wizard',
    resource: resourceName,
    value: undefined,
    ...props,
  })
}

const Wizard = (props: WizardProps): JSX.Element => {
  const [show, setShow] = React.useState(false)
  const { wizard, provider, object, setObject, notifier, analytics, style, ViewType, user, resourceName } = props

  const handleToggle = (): void => {
    sendPushAnalytics(resourceName, 'open_wizard', props)
    setShow(!show)
  }

  clearInitialObjectState()

  return (
    <div style={style}>
      <Button onClick={handleToggle} variantColor="teal" variant="outline" width="inherit">
        {wizard.title}
      </Button>

      <WizardContainer
        wizard={wizard}
        show={show}
        provider={provider}
        object={object}
        setObject={setObject}
        notifier={notifier}
        analytics={analytics}
        ViewType={ViewType}
        user={user}
        submitChange={submitChange}
      />
    </div>
  )
}

export { Wizard }
