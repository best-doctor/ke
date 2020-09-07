import * as React from 'react'

import type { BaseProvider } from '../../admin/providers'

const makeCheck = (
  validators: Function[],
  changeValue: object | string,
  setMessage: Function,
  provider: BaseProvider,
  detailObject: object
): void => {
  validators.forEach((validator: Function) => {
    validator(changeValue, provider, detailObject).then((validationResult: string) =>
      setMessage((oldState: string[]) => [...oldState, validationResult])
    )
  })
}

const useValidation = (
  callback: Function,
  blockingValidators: Function[],
  notBlockingValidators: Function[],
  provider: BaseProvider,
  detailObject: object
): { infoMessages: string[]; errorMessages: string[]; handleAction: Function } => {
  const [infoMessages, setInfoMessage] = React.useState<string[]>([])
  const [errorMessages, setErrorMessage] = React.useState<string[]>([])

  const handleAction = (changeValue: object | string): void | null => {
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

export { useValidation }
