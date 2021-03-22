import { KeyValueProvider } from '@cdk/Providers'

class LocalStorage implements KeyValueProvider<string, string> {
  constructor(private readonly base: Storage) {}

  get(key: string): Promise<string | null> {
    return Promise.resolve(this.base.getItem(key))
  }

  set(key: string, value: string): Promise<void> {
    this.base.setItem(key, value)
    return Promise.resolve()
  }

  remove(key: string): Promise<void> {
    this.base.removeItem(key)
    return Promise.resolve()
  }
}

export const localStorageProvider = new LocalStorage(localStorage)
