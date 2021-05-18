import { ReactNode } from 'react'

interface WizardProps<Key extends string> {
  steps: Record<Key, (args: StepArgs<Key>) => ReactNode>
  map: Record<Key, Record<string, Key>>
  start: Start<Key>
  name: string
  onStepChange: (stepKey: Key, data: object) => void
  onFinish: (data: object) => void
  onRestart: () => void
}

interface Start<Key> {
  step: Key
  data: object
}

interface StepArgs<Key> {
  data: object
  next: (nextKey: Key, data: object, submit?: (data: unknown) => void) => void
  restart: () => void
  finish: () => void
  onChange: (data: object) => void
}

export { WizardProps }
