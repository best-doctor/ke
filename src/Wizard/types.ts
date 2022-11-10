import { ReactNode } from 'react'

interface WizardProps<Key extends string, Action extends string, StepData extends object = {}> {
  map: Record<Key, Partial<Record<Action, Key>>>
  steps: Record<Key, (args: StepArgs<Action, StepData>) => ReactNode>
  start: Start<Key>
  name: string
  onStepChange: (stepKey: Key, data: StepData) => void
  onFinish: (data: StepData) => void
  onRestart: () => void
}

interface Start<Key, StepData extends object = {}> {
  step: Key
  data: StepData
}

interface StepArgs<Action, StepData extends object = {}> {
  data: StepData
  next: NextStep<Action, StepData>
  restart: () => void
  finish: () => void
  onChange: (data: StepData) => void
}

type NextStep<Action, StepData extends object = {}> = (
  nextKey: Action,
  data: StepData,
  submit?: (data: unknown) => void
) => void

export { WizardProps, NextStep, StepArgs }
