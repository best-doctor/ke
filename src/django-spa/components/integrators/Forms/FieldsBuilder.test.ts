import fc from 'fast-check'

import { fieldsBuilder } from './FieldsBuilder'

const fieldArbitrary = fc
  .tuple(
    fc.record({
      control: fc.constant(jest.fn()),
      name: fc.string({ minLength: 5 }),
    }),
    fc.dictionary(fc.string({ minLength: 5 }), fc.anything())
  )
  .map(([base, ext]) => ({
    ...ext,
    ...base,
  }))

test('Return items same length as fields prop', () => {
  fc.assert(
    fc.property(fc.array(fieldArbitrary), (fields) => {
      const result = fieldsBuilder(jest.fn(), { fields })

      expect(result.length).toBe(fields.length)
    })
  )
})
