export function toAsync<T>(base: Iterable<T>): AsyncIterable<T> {
  return {
    [Symbol.asyncIterator]: () => toAsyncIterator(base[Symbol.iterator]()),
  }
}

function toAsyncIterator<T>(base: Iterator<T>): AsyncIterator<T> {
  return {
    next: () => Promise.resolve(base.next()),
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    return: base.return ? () => Promise.resolve(base.return!()) : undefined,
    throw: base.throw ? () => Promise.resolve(base.throw!()) : undefined,
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }
}
