import { useCallback } from 'react'
import { useTestIdConfig } from '../TestIdProvider/hooks/useTestIdConfig'
import { WithDataTestId } from '../types'

export interface TestIdGenerationProps extends WithDataTestId {
  name?: string
  prefix?: string
  postfix?: string
}

export type UseTestIdProps = TestIdGenerationProps

export interface UseCreateTestIdResult {
  getDataTestId(options?: TestIdGenerationProps): WithDataTestId
  create(options?: TestIdGenerationProps): string | undefined
}

export function useCreateTestId(config: UseTestIdProps = {}): UseCreateTestIdResult {
  const { name: configName, 'data-test-id': configDataTestId, prefix: configPrefix, postfix: configPostfix } = config

  const { config: testIdConfig } = useTestIdConfig() ?? {}

  const create = useCallback(
    ({
      name = configName,
      'data-test-id': dataTestId = configDataTestId,
      prefix = configPrefix,
      postfix = configPostfix,
    }: UseTestIdProps = {}): string | undefined => {
      if (testIdConfig?.enabled === false) {
        return undefined
      }
      if (dataTestId) {
        return dataTestId
      }
      if (!name) {
        return name
      }
      let testId = name
      if (prefix) {
        testId = prefix.concat(testId)
      }
      if (postfix) {
        testId = testId.concat(postfix)
      }
      return testId
    },
    [configDataTestId, configName, configPostfix, configPrefix, testIdConfig?.enabled]
  )

  const getDataTestId = (options: UseTestIdProps = {}): WithDataTestId => {
    const dataTestId = create(options)
    return { 'data-test-id': dataTestId }
  }

  return { getDataTestId, create }
}
