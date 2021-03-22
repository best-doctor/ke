import { KeyValueProvider } from '@cdk/Providers'

export class NamespaceWrapper<T> implements KeyValueProvider<string, T> {
  constructor(private readonly base: KeyValueProvider<string, T>, private readonly keyPrefix: string) {}

  private withPrefix(key: string): string {
    return `${this.keyPrefix}::${key}`
  }

  get(key: string): Promise<T | null> {
    return this.base.get(this.withPrefix(key))
  }

  set(key: string, value: T): Promise<void> {
    return this.base.set(this.withPrefix(key), value)
  }

  remove(key: string): Promise<void> {
    return this.base.remove(this.withPrefix(key))
  }
}
