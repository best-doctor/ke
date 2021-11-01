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
  return {
    get: withPrefix(base, base.get, namespace),
    set: withPrefix(base, base.set, namespace),
    remove: withPrefix(base, base.remove, namespace),
  } as StringKeyValueProvider<T>
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
