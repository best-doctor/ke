import * as React from 'react'
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/core'

import { WrappedLocalStorage } from '../../store/localStorageWrapper'
import { WizardStepContainer } from './WizardStepContainer'

import type { BaseNotifier } from '../../utils/notifier'
import type { BaseProvider } from '../../admin/providers/index'
import type { BaseWizard } from '../interfaces'
import type { BaseAnalytic } from '../../integration/analytics/base'

type WizardContainerProps = {
  isOpen: boolean
  onClose: (event: React.MouseEvent | React.KeyboardEvent, reason: any) => void
  wizard: BaseWizard
  provider: BaseProvider
  object: object
  setObject: Function
  notifier: BaseNotifier
  analytics: BaseAnalytic
  ViewType: string
  user: object
}

const WizardContainer = (props: WizardContainerProps): JSX.Element => {
  const { wizard, provider, object, setObject, notifier, analytics, isOpen, onClose, user, ViewType } = props

  const [currentState, setCurrentState] = React.useState<string>('begin')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <WizardStepContainer
          wizard={wizard}
          wizardStep={wizard.stateWidgetMapping[currentState]}
          provider={provider}
          object={WrappedLocalStorage.getItem('__initial__') || object}
          currentState={currentState}
          setCurrentState={setCurrentState}
          setObject={setObject}
          notifier={notifier}
          analytics={analytics}
          user={user}
          ViewType={ViewType}
        />
      </ModalContent>
    </Modal>
  )
}

export { WizardContainer }
