import React, { useEffect, useRef } from 'react'
import type { Provider } from '../../admin/providers/interfaces'
import type { DetailObject, ValidatorFunction } from '../../typing'

const makeCheck = (
  validators: ValidatorFunction[],
  changeValue: object | string,
  setMessage: Function,
  provider: Provider,
  detailObject: DetailObject
): void => {
  validators.forEach((validator: ValidatorFunction) => {
    validator(changeValue, provider, detailObject).then((validationResult: string) =>
      setMessage((oldState: string[]) => [...oldState, validationResult])
    )
  })
}

const useValidation = (
  callback: Function,
  blockingValidators: ValidatorFunction[],
  notBlockingValidators: ValidatorFunction[],
  provider: Provider,
  detailObject: DetailObject
): { infoMessages: string[]; errorMessages: string[]; handleAction: Function } => {
  const [infoMessages, setInfoMessage] = React.useState<string[]>([])
  const [errorMessages, setErrorMessage] = React.useState<string[]>([])

  const handleAction = (changeValue: object | string): void | null => {
    setErrorMessage([])
    setInfoMessage([])
    makeCheck(blockingValidators, changeValue, setErrorMessage, provider, detailObject)
    makeCheck(notBlockingValidators, changeValue, setInfoMessage, provider, detailObject)

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
  value: string | object
): { infoMessages: string[]; errorMessages: string[] } => {
  const [infoMessages, setInfoMessage] = React.useState<string[]>([])
  const [errorMessages, setErrorMessage] = React.useState<string[]>([])
  const initialValue = useRef({})

  useEffect(() => {
    if (initialValue.current !== value) {
      setErrorMessage([])
      setInfoMessage([])
      makeCheck(blockingValidators, value, setErrorMessage, provider, detailObject)
      makeCheck(notBlockingValidators, value, setInfoMessage, provider, detailObject)
      initialValue.current = value
    }
  }, [blockingValidators, notBlockingValidators, provider, detailObject, value])

  return {
    infoMessages,
    errorMessages,
  }
}

export { useValidation, useValueValidation }
