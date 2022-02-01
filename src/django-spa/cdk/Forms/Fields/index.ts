import { partial } from '@utils/funcs'

import { useValuesArray, useValuesLeaf, useValuesRecord } from './ValuesTree'
import { useRecord as genericUseRecord } from './Record.hook'

import { useArray as genericUseArray } from './Array.hook'
import { useField as genericUseField } from './Field.hook'
import { FieldData, FieldKey, Updater } from './types'

export { ControlRefProps, FieldKey, RecordData, ArrayData, FieldData, RootProviderDesc } from './types'

export const useField = partial(
  genericUseField,
  useValuesLeaf as (key: FieldKey) => [FieldData, (updater: Updater<FieldData>) => void]
)
export const useRecord = partial(genericUseRecord, useValuesRecord)
export const useArray = partial(genericUseArray, useValuesArray)
