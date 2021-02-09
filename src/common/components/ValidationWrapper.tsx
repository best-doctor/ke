import * as React from 'react'

import { MessagesBlock } from './MessagesBlock'
import { useValidation } from '../hooks/useValidation'

import type { Provider } from '../../admin/providers/interfaces'
import type { DetailObject } from '../../typing'

type ValidationWrapperProps = {
  children: JSX.Element
  blockingValidators: Function[]
  notBlockingValidators: Function[]
  provider: Provider
  detailObject: DetailObject
}

/**
 * Wrapper component to adding validation checks.
 * Can be used only for children with handleChange prop.
 *
 * @param children - standard react children
 * @param blockingValidators - fail in this validators will be shown as error
 * @param notBlockingValidators - fail in this validators will be shown as info
 * @param provider - provider for backend request, will be passed as second param to validators
 * @param detailObject - addition object, will be passed as third param to validators
 */
const ValidationWrapper = ({
  children,
  blockingValidators,
  notBlockingValidators,
  provider,
  detailObject,
}: ValidationWrapperProps): JSX.Element => {
  const originalHandler = children.props.handleChange || children.props.onChange || children.props.onClick

  const { infoMessages, errorMessages, handleAction } = useValidation(
    originalHandler,
    blockingValidators,
    notBlockingValidators,
    provider,
    detailObject
  )

  return (
    <>
      <children.type {...children.props} handleChange={handleAction} />
      <MessagesBlock messages={infoMessages} messageType="warning" />
      <MessagesBlock messages={errorMessages} messageType="error" />
    </>
  )
}

export { ValidationWrapper }
