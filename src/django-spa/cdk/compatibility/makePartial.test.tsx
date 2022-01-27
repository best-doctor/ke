import React from 'react'
import { fc, testProp } from 'jest-fast-check'
import { render } from '@testing-library/react'

import { makePartial } from './makePartial'

const propsArbitrary = fc.dictionary(fc.string(), fc.anything())

testProp('Values correctly converted', [propsArbitrary, propsArbitrary], (predefinedProps, additionalProps) => {
  const SourceComponent = jest.fn().mockReturnValue('test')
  const PartialComponent = makePartial(SourceComponent, predefinedProps)

  // Фактически это компонент-обёртка
  // eslint-disable-next-line react/jsx-props-no-spreading
  render(<PartialComponent {...additionalProps} />)

  expect(SourceComponent).toHaveBeenCalledTimes(1)
  expect(SourceComponent).toHaveBeenCalledWith({ ...additionalProps, ...predefinedProps }, {})
})
