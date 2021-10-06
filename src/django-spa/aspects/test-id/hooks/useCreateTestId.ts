import { useCallback } from 'react'
import { useTestIdConfig } from '../TestIdProvider/hooks/useTestIdConfig'
import { WithDataTestId } from '../types'
import { useWizardName } from '../WizardNameProvider'

export interface TestIdGenerationProps extends WithDataTestId {
  name?: string
  stepName?: string
  wizardName?: string
}

export type UseTestIdProps = TestIdGenerationProps

export interface UseCreateTestIdResult {
  getDataTestId(options?: TestIdGenerationProps): WithDataTestId
  create(options?: TestIdGenerationProps): string | undefined
}

export function useCreateTestId(config: UseTestIdProps = {}): UseCreateTestIdResult {
  const { stepName: contextStepName, name: contextWizardName } = useWizardName()
  const {
    name: configName,
    stepName: configStepName = contextStepName,
    wizardName: configWizardName = contextWizardName,
    'data-test-id': configDataTestId,
  } = config

  const { config: testIdConfig } = useTestIdConfig() ?? {}

  const create = useCallback(
    ({
      name = configName,
      stepName = configStepName,
      wizardName = configWizardName,
      'data-test-id': dataTestId = configDataTestId,
    }: UseTestIdProps = {}): string | undefined => {
      let resultDataTestId: string | undefined

      if (testIdConfig?.enabled === false) {
        resultDataTestId = undefined
      } else if (dataTestId) {
        resultDataTestId = dataTestId
      } else {
        resultDataTestId = [wizardName, stepName, name].filter((item) => !!item).join('-')
      }

      return resultDataTestId
    },
    [configDataTestId, configName, configStepName, configWizardName, testIdConfig?.enabled]
  )

  const getDataTestId = (options: UseTestIdProps = {}): WithDataTestId => {
    const dataTestId = create(options)
    return { 'data-test-id': dataTestId }
  }

  return { getDataTestId, create }
}
