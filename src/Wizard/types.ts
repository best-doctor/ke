import { ReactNode } from 'react'

interface WizardProps<Key extends string, Action extends string, StepData extends object> {
  map: Record<Key, Partial<Record<Action, Key>>>
  steps: Record<Key, (args: StepArgs<Action, StepData>) => ReactNode>
  start: Start<Key, StepData>
  name: string
  onStepChange: (stepKey: Key, data: StepData) => void
  onFinish: (data: StepData) => void
  onRestart: () => void
}

interface Start<Key, StepData> {
  step: Key
  data: StepData
}

interface StepArgs<Action, StepData> {
  data: StepData
  next: NextStep<Action, StepData>
  restart: () => void
  finish: () => void
  onChange: (data: StepData) => void
}

type NextStep<Action, StepData> = (nextKey: Action, data: StepData, submit?: (data: unknown) => void) => void

export { WizardProps, NextStep, StepArgs }
