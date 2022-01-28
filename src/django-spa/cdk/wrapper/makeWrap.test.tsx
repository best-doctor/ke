import React, { ComponentType, PropsWithChildren, ReactNode } from 'react'
import { testProp, fc } from 'jest-fast-check'
import { render, cleanup } from '@testing-library/react'
import { expectType } from 'tsd'

import { makeWrap } from './makeWrap'

testProp(
  'Созданный компонент при рендере вызывает и обёртку',
  [fc.string(), fc.lorem()],
  (targetResult, wrapperResult) => {
    const target = jest.fn().mockReturnValue(<div>{targetResult}</div>)
    const wrapper = jest.fn().mockReturnValue(<div>{wrapperResult}</div>)

    const Wrapped = makeWrap(target, wrapper)
    render(<Wrapped />)

    expect(wrapper).toHaveBeenCalledTimes(1)
  }
)

test('При рендере созданного компонента используется результат обёртки', () => {
  fc.assert(
    fc
      .property(fc.string(), fc.lorem(), (targetResult, wrapperResult) => {
        const target = jest.fn().mockReturnValue(<div>{targetResult}</div>)
        const wrapper = jest.fn().mockReturnValue(<div>{wrapperResult}</div>)

        const Wrapped = makeWrap(target, wrapper)
        const { getByText } = render(<Wrapped />)

        expect(getByText(wrapperResult)).toBeInTheDocument()
      })
      .afterEach(cleanup)
  )
})

test('При рендере в компонент-обёртку в качестве children передаётся оборачиваемый компонент', () => {
  fc.assert(
    fc
      .property(fc.lorem(), (targetResult) => {
        const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => <div>{children}</div>
        const target = jest.fn().mockReturnValue(<div>{targetResult}</div>)

        const Wrapped = makeWrap(target, wrapper)
        const { getByText } = render(<Wrapped />)

        expect(getByText(targetResult)).toBeInTheDocument()
      })
      .afterEach(cleanup)
  )
})

test('Props из нового компонента пробрасываются в оборачиваемый', () => {
  fc.assert(
    fc
      .property(fc.dictionary(fc.lorem(), fc.lorem()), (props) => {
        const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => <div>{children}</div>
        const target = jest.fn().mockReturnValue(<div>TARGET</div>)

        const Wrapped = makeWrap(target, wrapper)
        // Тестируем на динамических пропсах
        /* eslint-disable react/jsx-props-no-spreading */
        render(<Wrapped {...props} />)

        expect(target).toHaveBeenCalledWith(props, {})
      })
      .afterEach(cleanup)
  )
})

test('Тип созданного компонента совпадает с оборачиваемым', () => {
  const Target = (props: { a: string; b: number }): JSX.Element => <div>{JSON.stringify(props)}</div>
  const Wrapper = (props: { c?: boolean; children?: ReactNode }): JSX.Element => <div>{JSON.stringify(props)}</div>

  expectType<ComponentType<{ a: string; b: number }>>(makeWrap(Target, Wrapper))
})
