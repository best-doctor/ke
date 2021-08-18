import fc from 'fast-check'

import { makePropsValueProxy } from './PropsValueProxy'

const propsDescArbitrary = fc.dictionary(fc.string(), fc.tuple(fc.anything(), fc.anything()))

test('Values correctly converted', () => {
  fc.assert(
    fc.property(propsDescArbitrary, (propsDesc) => {
      const SourceComponent = jest.fn()
      const propsDescPairs = Object.entries(propsDesc)
      const props = Object.fromEntries(propsDescPairs.map(([key, [source]]) => [key, source]))
      const converters = new Map(propsDescPairs.map(([key, [, target]]) => [key, jest.fn().mockReturnValue(target)]))
      const ProxiedComponent = makePropsValueProxy(SourceComponent, converters)

      ProxiedComponent(props)

      expect(SourceComponent.mock.calls.length).toBe(1)
      expect(SourceComponent.mock.calls[0]).toEqual([
        Object.fromEntries(propsDescPairs.map(([key, [, target]]) => [key, target])),
      ])
      ;[...converters.entries()].forEach(([key, converter]) => {
        expect(converter.mock.calls.length).toBe(1)
        expect(converter.mock.calls[0]).toEqual([props[key]])
      })
    })
  )
})
