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
