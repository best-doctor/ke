import { useCallback, useContext } from 'react'

import { isArrContext, RootContext } from './Root.context'
import { ArrContext, RecContext, ValueDesc } from './types'

export function useValue(key: string | number): UseValueResult {
  const root = useContext(RootContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setValue = useCallback(isArrContext(root) ? makeArrUpdater(key as number, root) : makeRecUpdater(key, root), [
    key,
    root,
  ])

  if (isArrContext(root)) {
    if (!isNumber(key) || key < 0) {
      throw new TypeError(`Key "${key}" not acceptable for array form data`)
    }
    return {
      value: root.value[key],
      errors: root.errors[key],
      setValue,
    }
  }

  if (!(key in root.value)) {
    throw new RangeError(`Key "${key}" not in provided value: ${JSON.stringify(root.value)}`)
  }

  return {
    value: root.value[key],
    errors: root.errors[key],
    setValue,
  }
}

function isNumber(val: string | number): val is number {
  return Number.isInteger(val)
}

function makeArrUpdater(key: number, { value, errors, setData }: ArrContext): (desc: ValueDesc<unknown>) => void {
  return (desc) =>
    setData({
      value: arrUpdate(value, key, desc.value),
      errors: arrUpdate(errors, key, desc.errors),
    })
}

function arrUpdate<T>(arr: T[], key: number, value: T): T[] {
  if (arr[key] !== value) {
    const updated = [...arr]
    updated[key] = value
    return updated
  }

  return arr
}

function makeRecUpdater(
  key: number | string,
  { value, errors, setData }: RecContext
): (desc: ValueDesc<unknown>) => void {
  return (desc) =>
    setData({
      value: recUpdate(value, key, desc.value),
      errors: recUpdate(errors, key, desc.errors),
    })
}

function recUpdate<K extends string | number, T>(rec: Record<K, T>, key: K, value: T): Record<K, T> {
  if (rec[key] !== value) {
    return {
      ...rec,
      [key]: value,
    }
  }

  return rec
}

type UseValueResult = ValueDesc<unknown> & {
  setValue: (valueDesc: ValueDesc<unknown>) => void
}
