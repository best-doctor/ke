/* eslint-disable no-console */
import React, { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useTestId } from './hooks/useTestId'
import { TestIdProvider } from './TestIdProvider'

test('Должен рендерить test id из имени виджета', () => {
  const {
    result: { current },
  } = renderHook(() => useTestId({ name: 'name' }), {
    wrapper: TestIdProvider,
  })
  expect(current).toBe('name')
})

test('Должен рендерить test id из имени виджета и шага визарда', () => {
  const {
    result: { current },
  } = renderHook(() => useTestId({ name: 'name', stepName: 'step' }), { wrapper: TestIdProvider })
  expect(current).toBe('step-name')
})

test('Должен рендерить test id из имени виджета и шага визарда и названия визарда', () => {
  const {
    result: { current },
  } = renderHook(() => useTestId({ name: 'name', stepName: 'step', wizardName: 'wizard' }), { wrapper: TestIdProvider })
  expect(current).toBe('wizard-step-name')
})

test('data-test-id должен рендерить data-test-id и переопределять другие пропсы', () => {
  const {
    result: { current },
  } = renderHook(() => useTestId({ name: 'name', stepName: 'step', wizardName: 'wizard', 'data-test-id': 'test-id' }), {
    wrapper: TestIdProvider,
  })
  expect(current).toBe('test-id')
})

test('Должен предупреждать о том, что ключи не уникальны', () => {
  console.warn = jest.fn()
  renderHook(
    () => {
      useTestId({ name: 'name' })
      useTestId({ name: 'name' })
    },
    { wrapper: TestIdProvider }
  )

  expect(console.warn).toBeCalledTimes(1)
})

test('Не должен предупреждать о том, что ключи не уникальны, если выключено в настройках', () => {
  console.warn = jest.fn()
  renderHook(
    () => {
      useTestId({ name: 'name' })
      useTestId({ name: 'name' })
    },
    {
      wrapper: ({ children }: PropsWithChildren<{}>) => (
        <TestIdProvider config={{ enableDuplicationsWarnings: false }}>{children}</TestIdProvider>
      ),
    }
  )

  expect(console.warn).not.toBeCalled()
})

test('Долежн возвращать undefined, если test-id глобально выключен', () => {
  const {
    result: { current },
  } = renderHook(() => useTestId({ name: 'name' }), {
    wrapper: ({ children }: PropsWithChildren<{}>) => (
      <TestIdProvider config={{ enabled: false }}>{children}</TestIdProvider>
    ),
  })

  expect(current).toBeUndefined()
})
