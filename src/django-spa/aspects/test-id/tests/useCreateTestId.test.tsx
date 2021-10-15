import React, { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { TestIdProvider, useCreateTestId } from '../TestIdProvider'

describe('useCreateTestId', () => {
  it('Должен рендерить test id из имени виджета', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateTestId({ name: 'name' }), {
      wrapper: TestIdProvider,
    })
    expect(current.create()).toBe('name')
  })

  it('Должен рендерить test id с префиксом', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateTestId({ name: 'name', prefix: 'prefix--' }), { wrapper: TestIdProvider })
    expect(current.create()).toBe('prefix--name')
  })

  it('Должен рендерить test id с префиксом из хука', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateTestId({ prefix: 'prefix--' }), { wrapper: TestIdProvider })
    expect(current.create({ name: 'name' })).toBe('prefix--name')
  })

  it('Должен рендерить test id с постфиксом', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateTestId({ name: 'name', postfix: '--postfix' }), { wrapper: TestIdProvider })
    expect(current.create()).toBe('name--postfix')
  })

  it('Должен рендерить test id с постфиксом из хука', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateTestId({ postfix: '--postfix' }), { wrapper: TestIdProvider })
    expect(current.create({ name: 'name' })).toBe('name--postfix')
  })

  it('Долежн возвращать undefined, если test-id глобально выключен', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateTestId({ name: 'name' }), {
      wrapper: ({ children }: PropsWithChildren<{}>) => (
        <TestIdProvider config={{ enabled: false }}>{children}</TestIdProvider>
      ),
    })

    expect(current.create()).toBeUndefined()
  })
})
