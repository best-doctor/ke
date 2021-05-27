import { Box } from '@chakra-ui/react'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { WizardProps } from './types'

export const Wizard = (props: WizardProps<string>): JSX.Element => {
  const { start, steps, onFinish, onRestart, name, map } = props
  const [currentStep, setCurrentStep] = useState(start.step)
  const [currentData, setCurrentData] = useState(start.data)
  const [currentForm, setCurrentForm] = useState<ReactNode>(null)

  const next = useCallback(
    (action: string, newData: object, submit): void => {
      const newStep = map[currentStep][action]
      setCurrentStep(newStep)
      setCurrentData(newData)
      submit && submit(currentData)
    },
    [currentStep, currentData, map]
  )

  const restart = useCallback((): void => {
    setCurrentStep(start.step)
    setCurrentData(start.data)
    onRestart()
  }, [onRestart, start])

  const finish = useCallback((): void => {
    onFinish(currentData)
  }, [onFinish, currentData])

  const onChange = useCallback(
    (data) => {
      setCurrentData({ ...currentData, ...data })
    },
    [currentData]
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
