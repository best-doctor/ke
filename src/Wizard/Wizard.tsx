import { Box } from '@chakra-ui/react'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import { usePropState } from '@cdk/Hooks'
import { WizardProps } from './types'

export const Wizard = <Key extends string, Action extends string, StepData extends object>(
  props: WizardProps<Key, Action, StepData>
): JSX.Element => {
  const { start, steps, onFinish, onRestart, name, map } = props
  const [currentStep, setCurrentStep] = useState(start.step)
  const [currentData, setCurrentData] = usePropState(start.data)
  const [currentForm, setCurrentForm] = useState<ReactNode>(null)

  const next = useCallback(
    (action: Action, newData: StepData, submit): void => {
      const possibleActions = map[currentStep]
      const newStep = possibleActions[action]
      if (newStep === undefined) {
        throw new RangeError(
          `Unknown action ${action} for step ${currentStep}. Expected one of ${Object.keys(possibleActions)}`
        )
      }
      setCurrentStep(newStep as Key)
      setCurrentData(newData)
      submit && submit(currentData)
    },
    [map, currentStep, setCurrentData, currentData]
  )

  const restart = useCallback((): void => {
    setCurrentStep(start.step)
    setCurrentData(start.data)
    onRestart()
  }, [onRestart, setCurrentData, start.data, start.step])

  const finish = useCallback((): void => {
    onFinish(currentData)
  }, [onFinish, currentData])

  const onChange = useCallback(
    (data) => {
      setCurrentData({ ...currentData, ...data })
    },
    [currentData, setCurrentData]
  )

  useEffect(() => {
    setCurrentForm(steps[currentStep]({ data: currentData, next, restart, finish, onChange }))
  }, [currentData, currentStep, next, finish, restart, steps, onChange])

  return (
    <Box>
      {name}
      {currentForm}
    </Box>
  )
}
