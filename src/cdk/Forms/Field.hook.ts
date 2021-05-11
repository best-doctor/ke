import { useContext } from 'react'

import { ValueContext } from './Value.context'

export function useField(key: string | number): [data: unknown, setData: (value: unknown) => void] {
  const [data, setData] = useContext(ValueContext)

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
