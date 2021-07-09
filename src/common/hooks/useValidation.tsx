import React, { useEffect, useRef } from 'react'
import type { Provider } from '../../admin/providers/interfaces'
import type { DetailObject, ValidatorFunction } from '../../typing'

const makeCheck = (
  validators: ValidatorFunction[],
  changeValue: object | string,
  setMessage: Function,
  provider: Provider,
  detailObject: DetailObject,
  context?: Record<string, unknown>
): void => {
  validators.forEach((validator: ValidatorFunction) => {
    validator(changeValue, provider, detailObject, context).then((validationResult: string) =>
      setMessage((oldState: string[]) => [...oldState, validationResult])
    )
  })
}

const useValidation = (
  callback: Function,
  blockingValidators: ValidatorFunction[],
  notBlockingValidators: ValidatorFunction[],
  provider: Provider,
  detailObject: DetailObject,
  context?: Record<string, unknown>
): { infoMessages: string[]; errorMessages: string[]; handleAction: Function } => {
  const [infoMessages, setInfoMessage] = React.useState<string[]>([])
  const [errorMessages, setErrorMessage] = React.useState<string[]>([])

  const handleAction = (changeValue: object | string): void | null => {
    setErrorMessage([])
    setInfoMessage([])
    makeCheck(blockingValidators, changeValue, setErrorMessage, provider, detailObject, context)
    makeCheck(notBlockingValidators, changeValue, setInfoMessage, provider, detailObject, context)

    if (!errorMessages.length) return callback(changeValue)
  }

  return {
    infoMessages,
    errorMessages,
    handleAction,
  }
}

const useValueValidation = (
  blockingValidators: ValidatorFunction[],
  notBlockingValidators: ValidatorFunction[],
  provider: Provider,
  detailObject: DetailObject,
  value: string | object,
  context?: Record<string, unknown>
): { infoMessages: string[]; errorMessages: string[] } => {
  const [infoMessages, setInfoMessage] = React.useState<string[]>([])
  const [errorMessages, setErrorMessage] = React.useState<string[]>([])
  const initialValue = useRef({})

  useEffect(() => {
    if (initialValue.current !== value) {
      setErrorMessage([])
      setInfoMessage([])
      makeCheck(blockingValidators, value, setErrorMessage, provider, detailObject, context)
      makeCheck(notBlockingValidators, value, setInfoMessage, provider, detailObject, context)
      initialValue.current = value
    }
  }, [blockingValidators, notBlockingValidators, provider, detailObject, context, value])

  return {
    infoMessages,
    errorMessages,
  }
}

export { useValidation, useValueValidation }
