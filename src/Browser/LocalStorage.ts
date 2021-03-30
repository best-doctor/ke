import { SyncKeyValueProvider } from '@cdk/Providers'

class LocalStorage implements SyncKeyValueProvider<string, string> {
  constructor(private readonly base: Storage) {}

  get(key: string): string | null {
    return this.base.getItem(key)
  }

  set(key: string, value: string): void {
    this.base.setItem(key, value)
  }

  remove(key: string): void {
    this.base.removeItem(key)
  }
}

export const localStorageProvider = new LocalStorage(localStorage)
