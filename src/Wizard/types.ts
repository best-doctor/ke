import { ReactNode } from 'react'

interface WizardProps<Key extends string, Action extends string> {
  knownSteps: Key[]
  steps: Record<Key, (args: StepArgs<Action>) => ReactNode>
  map: Record<Key, Partial<Record<Action, Key>>>
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

interface StepArgs<Action> {
  data: object
  next: (nextKey: Action, data: object, submit?: (data: unknown) => void) => void
  restart: () => void
  finish: () => void
  onChange: (data: object) => void
}

export { WizardProps }
