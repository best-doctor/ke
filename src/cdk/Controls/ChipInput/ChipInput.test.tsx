import React from 'react'
import fc from 'fast-check'
import { mount } from 'enzyme'
import { Tag, TagCloseButton, TagLabel, ChakraProvider } from '@chakra-ui/react'

import { ChipInput } from './ChipInput'

const stringArbitrary = fc.string({ minLength: 3, maxLength: 10 })
const arrayArbitrary = fc.array(stringArbitrary, { minLength: 1, maxLength: 10 })
const makeChangeEvent = (value: unknown) => ({ target: { value } } as const)

const getComponent = (
  content: string[],
  handleChange: (chips: string[]) => void,
  validator?: (value: string) => boolean,
  errorText?: string
): JSX.Element => (
  <ChakraProvider>
    <ChipInput
      content={content}
      handleChange={handleChange}
      placeholder="test"
      validator={validator}
      errorText={errorText}
    />
  </ChakraProvider>
)

test('Chip Input initial values are rendered', () => {
  fc.assert(
    fc.property(arrayArbitrary, (content) => {
      const chipInput = mount(getComponent(content, jest.fn()))

      expect(chipInput.find(Tag).length).toEqual(content.length)
    })
  )
})

test.each([['Enter'], ['Tab']])('Chip Input adds values on submitKeys pressed', (submitKey) => {
  fc.assert(
    fc.property(stringArbitrary, (value) => {
      const handleChange = jest.fn()
      const chipInput = mount(getComponent([], handleChange))

      chipInput.find('input').simulate('change', makeChangeEvent(value))
      chipInput.find('input').simulate('keydown', { key: submitKey })

      expect(chipInput.find(Tag).length).toEqual(1)
      expect(chipInput.find(TagLabel).text()).toEqual(value.trim())
      expect(handleChange).toBeCalledWith([value.trim()])
    })
  )
})

test('Chip Input backspace on empty input removes last chip', () => {
  fc.assert(
    fc.property(arrayArbitrary, (content) => {
      const handleChange = jest.fn()
      const chipInput = mount(getComponent(content, handleChange))

      chipInput.find('input').simulate('keydown', { key: 'Backspace' })

      expect(chipInput.find(Tag).length).toEqual(content.length - 1)
      expect(handleChange).toBeCalledWith(content.slice(0, -1))
    })
  )
})

test('Chip Input backspace on empty input does not break on empty list', () => {
  const handleChange = jest.fn()
  const chipInput = mount(getComponent([], handleChange))

  chipInput.find('input').simulate('keydown', { key: 'Backspace' })

  expect(chipInput.find(Tag).length).toEqual(0)
  expect(handleChange).toBeCalledTimes(0)
})

test('Chip Input backspace on non-empty input removes last symbol', () => {
  fc.assert(
    fc.property(arrayArbitrary, stringArbitrary, (content, value) => {
      const handleChange = jest.fn()
      const chipInput = mount(getComponent(content, handleChange))
      chipInput.find('input').simulate('change', makeChangeEvent(value))

      chipInput.find('input').simulate('keydown', { key: 'Backspace' })

      expect(chipInput.find(Tag).length).toEqual(content.length)
      expect(handleChange).toBeCalledTimes(0)
    })
  )
})

test('Chip Input validation error', () => {
  fc.assert(
    fc.property(arrayArbitrary, stringArbitrary, stringArbitrary, (content, value, errorText) => {
      const handleChange = jest.fn()
      const validator = (): boolean => false
      const chipInput = mount(getComponent(content, handleChange, validator, errorText))
      chipInput.find('input').simulate('change', makeChangeEvent(value))

      chipInput.find('input').simulate('keydown', { key: 'Enter' })

      expect(chipInput.find(Tag).length).toEqual(content.length)
      expect(chipInput.find('.error').first().text()).toEqual(errorText)
      expect(handleChange).toBeCalledTimes(0)
    })
  )
})

test('Chip Input remove button removes chip', () => {
  fc.assert(
    fc.property(
      arrayArbitrary.chain((v) => fc.tuple(fc.constant(v), fc.integer({ min: 0, max: v.length - 1 }))),
      ([content, index]) => {
        const handleChange = jest.fn()
        const chipInput = mount(getComponent(content, handleChange))

        chipInput.find(TagCloseButton).at(index).simulate('click')

        expect(chipInput.find(Tag).length).toEqual(content.length - 1)
        expect(handleChange).toBeCalledWith(content.filter((_, contentIndex) => contentIndex !== index))
      }
    )
  )
})

test('Chip Input does not break on undefined input value', () => {
  const handleChange = jest.fn()
  const chipInput = mount(getComponent((undefined as unknown) as string[], handleChange))

  expect(chipInput.find(Tag).length).toEqual(0)
})

test('Chip Input adds value on blur event', () => {
  fc.assert(
    fc.property(stringArbitrary, (value) => {
      const handleChange = jest.fn()
      const chipInput = mount(getComponent([], handleChange))

      chipInput.find('input').simulate('change', makeChangeEvent(value))
      chipInput.find('input').simulate('blur')

      expect(chipInput.find(Tag).length).toEqual(1)
      expect(chipInput.find(TagLabel).text()).toEqual(value.trim())
      expect(handleChange).toBeCalledWith([value.trim()])
    })
  )
})
