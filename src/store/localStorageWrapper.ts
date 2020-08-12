class WrappedLocalStorage {
  static setItem(itemKey: string, payload: any): void {
    localStorage.setItem(itemKey, JSON.stringify(payload))
  }

  static getItem(itemKey: string): object | null {
    const item = localStorage.getItem(itemKey)

    if (item) return JSON.parse(item)

    return null
  }

  static popItem(itemKey: string): object | null {
    const item = WrappedLocalStorage.getItem(itemKey)
    localStorage.removeItem(itemKey)

    return item
  }
}

export { WrappedLocalStorage }
