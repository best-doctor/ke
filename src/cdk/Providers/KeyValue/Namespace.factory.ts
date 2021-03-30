import { AsyncKeyValueProvider, SyncKeyValueProvider } from './types'

export function makeNamespace<T>(
  base: AsyncKeyValueProvider<string, T>,
  namespace: string
): AsyncKeyValueProvider<string, T>
export function makeNamespace<T>(
  base: SyncKeyValueProvider<string, T>,
  namespace: string
): SyncKeyValueProvider<string, T>
export function makeNamespace<T>(base: StringKeyValueProvider<T>, namespace: string): StringKeyValueProvider<T> {
  const namespaced = { ...base }
  namespaced.get = withPrefix(namespaced, namespaced.get, namespace)
  namespaced.set = withPrefix(namespaced, namespaced.set, namespace)
  namespaced.remove = withPrefix(namespaced, namespaced.remove, namespace)

  return namespaced
}

function withPrefix<F extends (key: string, ...args: never[]) => unknown>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: StringKeyValueProvider<any>,
  func: F,
  prefix: string
): F {
  return ((key, ...args) => func.call(provider, `${prefix}::${key}`, ...args)) as F
}

type StringKeyValueProvider<T> = AsyncKeyValueProvider<string, T> | SyncKeyValueProvider<string, T>
