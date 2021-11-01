import { useEffect, useState } from 'react'

export function useApiState<T, Config extends ApiConfig<T>>(
  initial: T,
  apiConfig: Config
): [state: T, api: Api<T, Config>] {
  const [state, setState] = useState(initial)

  useEffect(() => setState(initial), [initial])

  const api = Object.fromEntries(
    Object.entries(apiConfig).map(([key, callback]) => [
      key,
      (...val: unknown[]) => setState((prev) => callback(prev, ...val)),
    ])
  )

  return [state, api as Api<T, Config>]
}

type ApiConfig<T> = {
  [name: string]: (prev: T, ...other: unknown[]) => T
}

type Api<T, Config extends ApiConfig<T>> = {
  [K in keyof Config]: Config[K] extends (store: T) => T
    ? () => void
    : Config[K] extends (store: T, ...other: infer E) => T
    ? (...val: E) => void
    : never
}
