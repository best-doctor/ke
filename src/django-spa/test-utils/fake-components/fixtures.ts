import { fc } from 'jest-fast-check'

export const componentNameArbitrary = fc.lorem({ mode: 'words' })

export const simplePropsArbitrary = fc.oneof(fc.string(), fc.integer(), fc.boolean())

export const orderedPropsArbitrary = fc.oneof(simplePropsArbitrary, fc.array(simplePropsArbitrary))

export const propsArbitrary = fc.dictionary(fc.lorem({ mode: 'words' }), orderedPropsArbitrary)

export const propsWithKeysSliceArbitrary = propsArbitrary.chain((props) =>
  fc.tuple(fc.constant(props), fc.shuffledSubarray(Object.keys(props)))
)
