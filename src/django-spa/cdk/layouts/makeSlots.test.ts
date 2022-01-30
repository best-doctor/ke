import { testProp, fc } from 'jest-fast-check'
import { expectNotType, expectType } from 'tsd'

import { makeSlots } from './makeSlots'

const slotsArbitrary = fc.dictionary(fc.string(), fc.string())
const propsArbitrary = fc
  .dictionary(fc.string(), fc.anything())
  .filter((props) => !Object.keys(props).includes('children'))

testProp(
  'Создаваемый макет использует переданную функцию mapping со всеми параметрами',
  [slotsArbitrary, propsArbitrary],
  (slots, props) => {
    const mappingSpy = jest.fn()
    const Layout = makeSlots(mappingSpy)

    Layout({ children: slots, ...props })

    expect(mappingSpy).toHaveBeenCalledTimes(1)
    expect(mappingSpy).toHaveBeenCalledWith(slots, props)
  }
)

test('У создаваемого макета ожидаемый тип', () => {
  expectType<(props: { children: { foo: JSX.Element; bar: JSX.Element } }) => JSX.Element>(
    makeSlots<'foo' | 'bar'>(jest.fn())
  )

  expectType<(props: { children: { foo?: JSX.Element } }) => JSX.Element>(
    makeSlots(jest.fn() as (slots: { foo?: JSX.Element | string }) => JSX.Element)
  )

  expectType<(props: { children: { foo?: JSX.Element }; bar: string }) => JSX.Element>(
    makeSlots(jest.fn() as (slots: { foo?: JSX.Element | string }, props?: { bar: string }) => JSX.Element)
  )

  expectNotType<(props: { children: { foo: JSX.Element; bar: JSX.Element } }) => JSX.Element>(
    makeSlots<'zip'>(jest.fn())
  )
})
