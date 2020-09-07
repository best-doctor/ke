import * as React from 'react'

import { MessagesBlock } from './MessagesBlock'
import { useValidation } from '../hooks/useValidation'

import type { BaseProvider } from '../../admin/providers'

type ValidationWrapperProps = {
  children: JSX.Element
  blockingValidators: Function[]
  notBlockingValidators: Function[]
  provider: BaseProvider
  detailObject: object
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
