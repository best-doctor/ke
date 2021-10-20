import fc from 'fast-check'

import { makePartial } from './makePartial'

const predefinedPropsArbitrary = fc.dictionary(fc.string(), fc.anything())
const additionalPropsArbitrary = predefinedPropsArbitrary

test('Values correctly converted', () => {
  fc.assert(
    fc.property(predefinedPropsArbitrary, additionalPropsArbitrary, (predefinedProps, additionalProps) => {
      const SourceComponent = jest.fn()
      const PartialComponent = makePartial(SourceComponent, predefinedProps)

      PartialComponent(additionalProps)

      expect(SourceComponent.mock.calls.length).toBe(1)
      expect(SourceComponent.mock.calls[0]).toEqual([{ ...additionalProps, ...predefinedProps }])
    })
  )
})
