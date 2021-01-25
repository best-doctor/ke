import * as React from 'react'
import { Button, Box } from '@chakra-ui/core'
import { Row, Col } from 'react-flexbox-grid'

import { submitChange } from '../controllers'
import { WizardContainer } from './WizardContainer'

import type { BaseNotifier } from '../../common/notifier'
import type { BaseProvider } from '../../admin/providers/index'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'
import type { BaseWizard } from '../interfaces'
import type { BaseAnalytic } from '../../integration/analytics/base'
import type { DetailObject } from '../../typing'
import type { GoogleConfig } from '../../integration/google'

type WizardProps = {
  resourceName: string
  wizard: BaseWizard
  provider: BaseProvider
  mainDetailObject: DetailObject
  setMainDetailObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic | undefined
  googleConfig: GoogleConfig | undefined
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
    googleConfig,
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
      <Row>
        <Col xs={12}>
          <Box marginBottom="16px">
            <Button
              key="wizardToggleButton"
              onClick={handleToggle}
              variantColor="green"
              width="inherit"
              style={{ width: '100%', height: '60px' }}
            >
              {wizard.title}
            </Button>
          </Box>
        </Col>
      </Row>

      <WizardContainer
        wizard={wizard}
        show={show}
        provider={provider}
        mainDetailObject={mainDetailObject}
        setMainDetailObject={setMainDetailObject}
        notifier={notifier}
        analytics={analytics}
        googleConfig={googleConfig}
        ViewType={ViewType}
        user={user}
        submitChange={submitChange}
      />
    </>
  )
}

export { Wizard }
