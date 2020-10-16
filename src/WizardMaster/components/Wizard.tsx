import * as React from 'react'
import * as GridLayout from 'react-grid-layout'
import { Button } from '@chakra-ui/core'

import { submitChange } from '../controllers'
import { WizardContainer } from './WizardContainer'

import type { BaseNotifier } from '../../common/notifier'
import type { BaseProvider } from '../../admin/providers/index'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'
import type { BaseWizard } from '../interfaces'
import type { BaseAnalytic } from '../../integration/analytics/base'
import type { DetailObject } from '../../typing'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)

type WizardProps = {
  resourceName: string
  wizard: BaseWizard
  provider: BaseProvider
  mainDetailObject: DetailObject
  setMainDetailObject: Function
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
    objectForAnalytics: props.mainDetailObject,
    ...props,
  })
}

const Wizard = (props: WizardProps): JSX.Element => {
  const [show, setShow] = React.useState(false)
  const {
    wizard,
    provider,
    mainDetailObject,
    setMainDetailObject,
    notifier,
    analytics,
    ViewType,
    user,
    resourceName,
  } = props

  const handleToggle = (): void => {
    // заюзать handleUserAction здесь
    sendPushAnalytics(resourceName, 'open_wizard', props)
    setShow(!show)
  }

  return (
    <>
      <ReactGridLayout key="wizardStepHeaderLayout" className="layout" cols={12} rowHeight={30}>
        <Button
          key="wizardToggleButton"
          onClick={handleToggle}
          variantColor="green"
          width="inherit"
          data-grid={{ x: 1, y: 0, w: 10, h: 2, static: true }}
        >
          {wizard.title}
        </Button>
      </ReactGridLayout>

      <WizardContainer
        wizard={wizard}
        show={show}
        provider={provider}
        mainDetailObject={mainDetailObject}
        setMainDetailObject={setMainDetailObject}
        notifier={notifier}
        analytics={analytics}
        ViewType={ViewType}
        user={user}
        submitChange={submitChange}
      />
    </>
  )
}

export { Wizard }
