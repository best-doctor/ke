import * as React from 'react'
import { Button } from '@chakra-ui/core'

import { submitChange } from '../controllers'
import { WizardContainer } from './WizardContainer'

import type { BaseNotifier } from '../../common/notifier'
import type { BaseProvider } from '../../admin/providers/index'
import type { BaseWizard } from '../interfaces'
import type { BaseAnalytic } from '../../integration/analytics/base'

type WizardProps = {
  wizard: BaseWizard
  provider: BaseProvider
  object: object
  setObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic
  ViewType: string
  user: object
  style?: object
}

const Wizard = (props: WizardProps): JSX.Element => {
  const [show, setShow] = React.useState(false)

  const handleToggle = (): void => setShow(!show)

  const { wizard, provider, object, setObject, notifier, analytics, style, ViewType, user } = props

  submitChange({ payload: { __initial__: null } })

  return (
    <div style={style}>
      <Button onClick={handleToggle} variantColor="teal" variant="outline">
        {`${wizard.title}`}
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
