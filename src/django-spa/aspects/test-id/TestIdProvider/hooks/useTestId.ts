/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect } from 'react'
import { useTestIdConfig } from './useTestIdConfig'

export interface TestIdGenerationProps {
  name?: string
  stepName?: string
  wizardName?: string
  'data-test-id'?: string
}

export type UseTestIdProps = TestIdGenerationProps

export function useTestId(props: UseTestIdProps): string | undefined {
  let dataTestId = props['data-test-id']

  const { name, stepName, wizardName } = props

  const testIdParts = [wizardName, stepName, name]
  if (typeof dataTestId !== 'string' && testIdParts.some((item) => typeof item === 'string')) {
    dataTestId = testIdParts.filter((value): value is string => typeof value === 'string').join('-')
  }

  dataTestId = dataTestId || undefined

  const { config, keys } = useTestIdConfig() ?? {}

  if (config?.enabled === false) {
    dataTestId = undefined
  }

  useEffect(() => {
    if (!dataTestId || !keys || config?.enabled === false || config?.enableDuplicationsWarnings === false) {
      return
    }
    if (keys.has(dataTestId)) {
      // eslint-disable-next-line no-console
      console.warn(`Test id: "${dataTestId}" already used`)
      return
    }
    keys.add(dataTestId)
    return () => {
      if (dataTestId) {
        keys.delete(dataTestId)
      }
    }
  }, [config?.enableDuplicationsWarnings, config?.enabled, dataTestId, keys])

  return dataTestId
}
