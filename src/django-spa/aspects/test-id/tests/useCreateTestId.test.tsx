import React, { PropsWithChildren } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { TestIdProvider, useCreateTestId } from '../TestIdProvider'
import { WizardNameProvider, WizardNameProviderProps } from '../WizardNameProvider'

describe('useCreateTestId без WizardNameProvider', () => {
  it('Должен рендерить test id из имени виджета', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateTestId({ name: 'name' }), {
      wrapper: TestIdProvider,
    })
    expect(current.create()).toBe('name')
  })

  it('Должен рендерить test id из имени виджета и шага визарда', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateTestId({ name: 'name', stepName: 'step' }), { wrapper: TestIdProvider })
    expect(current.create()).toBe('step-name')
  })

  it('Должен рендерить test id из имени виджета и шага визарда и названия визарда', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateTestId({ name: 'name', stepName: 'step', wizardName: 'wizard' }), {
      wrapper: TestIdProvider,
    })
    expect(current.create()).toBe('wizard-step-name')
  })

  it('data-test-id должен рендерить data-test-id и переопределять другие пропсы', () => {
    const {
      result: { current },
    } = renderHook(
      () => useCreateTestId({ name: 'name', stepName: 'step', wizardName: 'wizard', 'data-test-id': 'test-id' }),
      {
        wrapper: TestIdProvider,
      }
    )
    expect(current.create()).toBe('test-id')
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

const Wrapper: React.FC<WizardNameProviderProps> = (props) => (
  <TestIdProvider>
    <WizardNameProvider {...props} />
  </TestIdProvider>
)

describe('useCreateTestId с данными из WizardNameProvider', () => {
  it('Должен рендерить test id с именем виджета из контекста', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateTestId({ name: 'name' }), {
      wrapper: (props) => <Wrapper {...props} name="wizard" />,
    })
    expect(current.create()).toBe('wizard-name')
  })

  it('Должен рендерить test id с именем виджета и именем шага из контекста', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateTestId({ name: 'name' }), {
      wrapper: ({ children }) => (
        <Wrapper name="wizard">
          <WizardNameProvider name="wizard" stepName="step">
            {children}
          </WizardNameProvider>
        </Wrapper>
      ),
    })
    expect(current.create()).toBe('wizard-step-name')
  })
})
