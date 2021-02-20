import { createContext, useContext } from 'react'

import type { FormsContextData } from './types'

const FormsContext = createContext<[FormsContextData, (data: FormsContextData) => void]>([{}, () => {}])

export const FormsContextProvider = FormsContext.Provider

export function useNodeState(key: string | number): [unknown, (value: unknown) => void] {
  const [data, setData] = useContext(FormsContext)

  if (Array.isArray(data)) {
    if (!Number.isInteger(key) || key < 0) {
      throw new TypeError(`Key "${key}" not acceptable for array form data`)
    }
    return [
      data[key as number],
      (val) => {
        const updatedArr = [...data]
        updatedArr[key as number] = val
        setData(updatedArr)
      },
    ]
  }

  if (!(key in data)) {
    throw new RangeError(`Key "${key}" not in provided data: ${JSON.stringify(data)}`)
  }

  return [data[key], (val) => setData({ ...data, [key]: val })]
}
