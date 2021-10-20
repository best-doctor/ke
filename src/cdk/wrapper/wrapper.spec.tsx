import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'

import { makeWrap } from './wrap.factory'

test('Рендерится обёртка и оборачиваемый компонент', () => {
  const Target = ({ inner }: { inner: string }): JSX.Element => <p>Target: {inner}</p>
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => <div>Wrapper: {children}</div>
  const innerText = 'Inner Test'

  const Wrapped = makeWrap(Target, Wrapper)
  const { getByText } = render(<Wrapped inner={innerText} />)

  expect(getByText('Wrapper:')).toBeInTheDocument()
  expect(getByText(`Target: ${innerText}`))
})
