import { makePropsKeyProxy } from './PropsKeyProxy.factory'

test('Keys correctly mapped', () => {
  const inner = jest.fn()
  const proxied = makePropsKeyProxy(
    inner,
    new Map([
      ['a', 'A'],
      ['b', 'B'],
    ])
  )

  proxied({ A: 1, B: 2, c: 3 })

  expect(inner.mock.calls.length).toBe(1)
  expect(inner.mock.calls[0][0]).toEqual({ a: 1, b: 2, c: 3 })
})
