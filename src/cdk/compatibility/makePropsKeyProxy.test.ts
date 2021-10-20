import fc from 'fast-check'

import { makePropsKeyProxy } from './makePropsKeyProxy'

const propsDescArbitrary = fc.dictionary(fc.string(), fc.tuple(fc.string(), fc.anything())).filter((propsDesc) => {
  const targetKeys = Object.values(propsDesc).map(([targetKey]) => targetKey)
  const uniqueTargetKeys = [...new Set(targetKeys).values()]
  return targetKeys.length === uniqueTargetKeys.length
})

test('Keys correctly mapped', () => {
  fc.assert(
    fc.property(propsDescArbitrary, (propsDesc) => {
      const SourceComponent = jest.fn()
      const propsDescPairs = Object.entries(propsDesc)
      const keysMap = new Map(propsDescPairs.map(([sourceKey, [targetKey]]) => [sourceKey, targetKey]))
      const props = Object.fromEntries(propsDescPairs.map(([, [targetKey, targetValue]]) => [targetKey, targetValue]))
      const ProxiedComponent = makePropsKeyProxy(SourceComponent, keysMap)

      ProxiedComponent(props)

      expect(SourceComponent.mock.calls.length).toBe(1)
      expect(SourceComponent.mock.calls[0]).toEqual([
        Object.fromEntries(propsDescPairs.map(([sourceKey, [, targetValue]]) => [sourceKey, targetValue])),
      ])
    })
  )
})
