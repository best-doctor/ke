import React from 'react'

import { MessagesBlock } from './MessagesBlock'
import { useValueValidation } from '../hooks/useValidation'

import type { Provider } from '../../admin/providers/interfaces'
import type { DetailObject, ValidatorFunction } from '../../typing'

type ValueValidationWrapperProps = {
  children: JSX.Element
  blockingValidators: ValidatorFunction[]
  notBlockingValidators: ValidatorFunction[]
  provider: Provider
  detailObject: DetailObject
  value: string | object
  context?: Record<string, unknown>
}

/**
 * Wrapper component to add validation checks against fixed value.
 *
 * @param children - standard react children
 * @param blockingValidators - fail in this validators will be shown as error
 * @param notBlockingValidators - fail in this validators will be shown as info
 * @param provider - provider for backend request, will be passed as second param to validators
 * @param detailObject - addition object, will be passed as third param to validators
 * @param value - value to validate, will be passed as first param to validators
 * @param context - current context
 */
const ValueValidationWrapper = ({
  children,
  blockingValidators,
  notBlockingValidators,
  provider,
  detailObject,
  value,
  context,
}: ValueValidationWrapperProps): JSX.Element => {
  const { infoMessages, errorMessages } = useValueValidation(
    blockingValidators,
    notBlockingValidators,
    provider,
    detailObject,
    value,
    context
  )

  return (
    <>
      <children.type {...children.props} />
      <MessagesBlock messages={infoMessages} messageType="warning" />
      <MessagesBlock messages={errorMessages} messageType="error" />
    </>
  )
}

export { ValueValidationWrapper }
