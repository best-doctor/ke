import { TestIdGenerationProps, useCreateTestId } from './useCreateTestId'

export type UseTestIdProps = TestIdGenerationProps

export function useTestId(props: UseTestIdProps = {}): string | undefined {
  const { create } = useCreateTestId(props)
  return create()
}
