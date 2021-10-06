import React from 'react'
import { Button, Box } from '@chakra-ui/react'
import { Row, Col } from 'react-flexbox-grid'

import { submitChange } from '../controllers'
import { WizardContainer } from './WizardContainer'

import type { BaseNotifier } from '../../common/notifier'
import type { Provider } from '../../admin/providers/interfaces'
import { EventNameEnum, WidgetTypeEnum } from '../../integration/analytics/firebase/enums'
import { pushAnalytics } from '../../integration/analytics'
import type { BaseWizard } from '../interfaces'
import type { BaseAnalytic } from '../../integration/analytics/base'
import type { Accessor, DetailObject } from '../../typing'
import { getAccessorWithDefault } from '../../DetailView/utils/dataAccess'
import { WizardNameProvider } from '../../django-spa/aspects/test-id/WizardNameProvider'

type WizardProps = {
  resourceName: string
  wizard: BaseWizard
  provider: Provider
  mainDetailObject: DetailObject
  setMainDetailObject: Function
  refreshMainDetailObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic | undefined
  ViewType: string
  user: object
  style?: object
  allowToggle?: Accessor<boolean>
  isExpanded?: Accessor<boolean>
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
  const {
    wizard,
    provider,
    mainDetailObject,
    setMainDetailObject,
    refreshMainDetailObject,
    notifier,
    analytics,
    ViewType,
    user,
    resourceName,
    allowToggle: allowToggleHandler = true,
    isExpanded: isExpandedHandler,
  } = props

  const effectiveAllowToggle = getAccessorWithDefault(allowToggleHandler, mainDetailObject, undefined, true)
  const effectiveIsExpanded = getAccessorWithDefault(
    isExpandedHandler,
    mainDetailObject,
    undefined,
    !effectiveAllowToggle
  )

  const [isExpanded, toggleExpanded] = React.useState(effectiveIsExpanded)

  const handleToggle = (): void => {
    // заюзать handleUserAction здесь
    sendPushAnalytics(resourceName, 'open_wizard', props)
    toggleExpanded(!isExpanded)
  }

  return (
    <Box data-wizard-name={wizard.name}>
      {effectiveAllowToggle && (
        <Row>
          <Col xs={12}>
            <Box marginBottom="16px">
              <Button
                key="wizardToggleButton"
                onClick={handleToggle}
                colorScheme="green"
                width="inherit"
                style={{ width: '100%', height: '60px' }}
              >
                {wizard.title}
              </Button>
            </Box>
          </Col>
        </Row>
      )}
      <WizardNameProvider name={wizard.name}>
        <WizardContainer
          wizard={wizard}
          show={isExpanded}
          provider={provider}
          mainDetailObject={mainDetailObject}
          setMainDetailObject={setMainDetailObject}
          refreshMainDetailObject={refreshMainDetailObject}
          notifier={notifier}
          analytics={analytics}
          ViewType={ViewType}
          user={user}
          submitChange={submitChange}
        />
      </WizardNameProvider>
    </Box>
  )
}

export { Wizard, WizardProps }
