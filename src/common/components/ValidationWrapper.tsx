// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import { MessagesBlock } from './MessagesBlock'
import { useValidation } from '../hooks/useValidation'

import type { Provider } from '../../admin/providers/interfaces'
import type { DetailObject, ValidatorFunction } from '../../typing'

type ValidationWrapperProps = {
  children: JSX.Element
  blockingValidators: ValidatorFunction[]
  notBlockingValidators: ValidatorFunction[]
  provider: Provider
  detailObject: DetailObject
  context?: Record<string, unknown>
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
 * @param context - current context
 */
const ValidationWrapper: React.FC<ValidationWrapperProps> = ({
  children,
  blockingValidators,
  notBlockingValidators,
  provider,
  detailObject,
  context,
}) => {
  const { props } = children as { props: { handleChange?: Function; onChange?: Function; onClick: Function } }
  const { handleChange, onChange, onClick } = props
  const originalHandler = handleChange || onChange || onClick

  const { infoMessages, errorMessages, handleAction } = useValidation(
    originalHandler,
    blockingValidators,
    notBlockingValidators,
    provider,
    detailObject,
    context
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
