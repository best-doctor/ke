import { makePropsValueProxy } from './PropsValueProxy'

test('Values correctly converted', () => {
  const inner = jest.fn()
  const aSpy = jest.fn().mockReturnValue('A')
  const bSpy = jest.fn().mockReturnValue('B')
  const proxied = makePropsValueProxy(
    inner,
    new Map([
      ['a', aSpy],
      ['b', bSpy],
    ])
  )

  proxied({ a: 1, b: 2, c: 3 })

  expect(inner.mock.calls.length).toBe(1)
  expect(inner.mock.calls[0][0]).toEqual({ a: 'A', b: 'B', c: 3 })
  expect(aSpy.mock.calls.length).toBe(1)
  expect(aSpy.mock.calls[0][0]).toBe(1)
  expect(bSpy.mock.calls.length).toBe(1)
  expect(bSpy.mock.calls[0][0]).toBe(2)
})
