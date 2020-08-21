class WrappedLocalStorage {
  static setItem(itemKey: string, payload: any): void {
    localStorage.setItem(itemKey, JSON.stringify(payload))
  }

  static getItem<T>(itemKey: string): T | null {
    const item = localStorage.getItem(itemKey)

    if (item) return JSON.parse(item)

    return null
  }

  static popItem<T>(itemKey: string): T | null {
    const item = WrappedLocalStorage.getItem<T>(itemKey)

    if (item) {
      localStorage.removeItem(itemKey)

      return item
    }

    return null
  }
}

export { WrappedLocalStorage }
