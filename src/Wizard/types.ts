import { ReactNode } from 'react'

interface WizardProps<Key extends string, Action extends string> {
  map: Record<Key, Partial<Record<Action, Key>>>
  steps: Record<Key, (args: StepArgs<Action>) => ReactNode>
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
  next: NextStep<Action>
  restart: () => void
  finish: () => void
  onChange: (data: object) => void
}

type NextStep<Action> = (nextKey: Action, data: object, submit?: (data: unknown) => void) => void

export { WizardProps, NextStep }
