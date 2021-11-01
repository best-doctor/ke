export function toPages<T>(base: AsyncIterable<T>, itemsPerPage: number): AsyncIterable<T[]> {
  return {
    async *[Symbol.asyncIterator]() {
      let page: T[] = []
      // eslint-disable-next-line no-restricted-syntax
      for await (const item of base) {
        page.push(item)
        if (page.length >= itemsPerPage) {
          yield page
          page = []
        }
      }

      if (page.length) {
        yield page
      }
    },
  }
}
