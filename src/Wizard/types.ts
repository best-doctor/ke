import { FC } from 'react'

export interface WizardProps<Key extends string, Action extends string, StepData extends object> {
  map: Record<Key, Partial<Record<Action, Key>>>
  steps: Record<Key, FC<StepArgs<Action, StepData>>>
  start: Start<Key, StepData>
  name: string
  onFinish: (data: StepData) => void
  onRestart: () => void
}

interface Start<Key, StepData> {
  step: Key
  data: StepData
}

export interface StepArgs<Action, StepData> {
  data: StepData
  next: NextStep<Action, StepData>
  restart: () => void
  finish: () => void
  onChange: (data: StepData) => void
}

export type NextStep<Action, StepData> = (nextKey: Action, data: StepData, submit?: (data: unknown) => void) => void
