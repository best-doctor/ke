import * as React from 'react'
import { Button, useDisclosure } from '@chakra-ui/core'

import { WrappedLocalStorage } from '../../store/localStorageWrapper'
import { WizardContainer } from './WizardContainer'

import type { BaseNotifier } from '../../utils/notifier'
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { wizard, provider, object, setObject, notifier, analytics, style, ViewType, user } = props
  WrappedLocalStorage.setItem('__initial__', null) // TODO move it to constant

  return (
    <>
      <Button onClick={onOpen} style={style} variantColor="teal" variant="outline">
        {`${wizard.title}`}
      </Button>

      <WizardContainer
        isOpen={isOpen}
        onClose={onClose}
        wizard={wizard}
        provider={provider}
        object={object}
        setObject={setObject}
        notifier={notifier}
        analytics={analytics}
        ViewType={ViewType}
        user={user}
      />
    </>
  )
}

export { Wizard }
