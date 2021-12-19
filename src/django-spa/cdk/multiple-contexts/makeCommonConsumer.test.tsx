import React, { createContext, FC, PropsWithChildren, ReactElement } from 'react'
import { testProp, fc } from 'jest-fast-check'
import { render } from '@testing-library/react'
import { mapValue } from '@utils/dicts'
import { makeCommonConsumer } from '@cdk/multiple-contexts/makeCommonConsumer'
import { expectType } from 'tsd'

const contexts = {
  first: createContext<unknown>(undefined),
  second: createContext<unknown>(undefined),
}

const Wrapper = ({ first, second, children }: PropsWithChildren<{ first: unknown; second: unknown }>): ReactElement => (
  <contexts.first.Provider value={first}>
    <contexts.second.Provider value={second}>{children}</contexts.second.Provider>
  </contexts.first.Provider>
)

const contextsDataArbitrary = fc.record(mapValue(contexts, () => fc.anything()))

const extPropsArbitrary = fc
  .dictionary(fc.lorem({ mode: 'words' }), fc.anything())
  .filter((props) => Object.keys(props).every((key) => ![...Object.keys(contexts), 'as'].includes(key)))

const somePropsArbitrary = fc.dictionary(fc.lorem({ mode: 'words' }), fc.anything())

testProp(
  'Итоговый компонент передаёт в целевой корректные данные из контекстов',
  [contextsDataArbitrary],
  (contextsData) => {
    const targetSpy = jest.fn().mockReturnValue('TEST')
    const Consumer = makeCommonConsumer(contexts)

    render(
      <Wrapper first={contextsData.first} second={contextsData.second}>
        <Consumer as={targetSpy} />
      </Wrapper>
    )

    expect(targetSpy).toHaveBeenCalledTimes(1)
    expect(targetSpy).toHaveBeenCalledWith(contextsData, {})
  }
)

testProp(
  'Итоговый компонент пробрасывает в целевой и дополнительные props',
  [contextsDataArbitrary, extPropsArbitrary],
  (contextsData, extProps) => {
    const targetSpy = jest.fn().mockReturnValue('TEST')
    const Consumer = makeCommonConsumer(contexts)

    render(
      <Wrapper first={contextsData.first} second={contextsData.second}>
        <Consumer as={targetSpy} {...extProps} />
      </Wrapper>
    )

    expect(targetSpy).toHaveBeenCalledTimes(1)
    expect(targetSpy).toHaveBeenCalledWith({ ...contextsData, ...extProps }, {})
  }
)

testProp(
  'Итоговый компонент использует прокси-функцию, когда она есть',
  [contextsDataArbitrary, somePropsArbitrary],
  (contextsData, proxiedProps) => {
    const targetSpy = jest.fn().mockReturnValue('TEST')
    const proxySpy = jest.fn().mockReturnValue(proxiedProps)
    const Consumer = makeCommonConsumer(contexts, proxySpy)

    render(
      <Wrapper first={contextsData.first} second={contextsData.second}>
        <Consumer as={targetSpy} />
      </Wrapper>
    )

    expect(proxySpy).toHaveBeenCalledTimes(1)
    expect(proxySpy).toHaveBeenCalledWith(contextsData)
    expect(targetSpy).toHaveBeenCalledTimes(1)
    expect(targetSpy).toHaveBeenCalledWith(proxiedProps, {})
  }
)

describe('Корректный тип результата', () => {
  test('Для вызова без прокси', () => {
    expectType<FC<{ as: FC<{ first: unknown; second: unknown }> }>>(makeCommonConsumer(contexts))
  })

  test('Для вызова с прокси', () => {
    const proxy: (data: { first: unknown; second: unknown }) => { a: number } = jest.fn()

    expectType<FC<{ as: FC<{ a: number }> }>>(makeCommonConsumer(contexts, proxy))
  })
})
