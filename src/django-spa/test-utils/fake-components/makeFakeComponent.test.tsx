// Тестируем на динамических пропсах
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { fc } from 'jest-fast-check'
import { render, cleanup } from '@testing-library/react'
import { pick } from '@utils/dicts'

import { componentNameArbitrary, propsArbitrary, propsWithKeysSliceArbitrary } from './fixtures'
import { makeFakeComponent } from './makeFakeComponent'

test('Фейковый компонент можно найти в результатах рендера с помощью его makeContent колбэка', () => {
  fc.assert(
    fc
      .property(componentNameArbitrary, propsArbitrary, (componentName, props) => {
        const [TestComponent, makeComponentContent] = makeFakeComponent(componentName)

        const { getByText } = render(<TestComponent {...props} />)

        expect(getByText(makeComponentContent(props))).toBeInTheDocument()
      })
      .afterEach(cleanup)
  )
})

test('Фейковые компоненты с разными именами не пересекаются', () => {
  fc.assert(
    fc
      .property(
        componentNameArbitrary,
        componentNameArbitrary,
        propsArbitrary,
        (componentName1, componentName2, props) => {
          const [TestComponent1, makeComponentContent1] = makeFakeComponent(componentName1)
          const [TestComponent2, makeComponentContent2] = makeFakeComponent(componentName2)

          const { getByText } = render(
            <>
              <TestComponent1 {...props} />
              <TestComponent2 {...props} />
            </>
          )

          // getByText выбросит исключение, если подходящих компонентов будет больше одного
          expect(getByText(makeComponentContent1(props))).toBeInTheDocument()
          expect(getByText(makeComponentContent2(props))).toBeInTheDocument()
        }
      )
      .afterEach(cleanup)
  )
})

test('Явное указание ключей приводит к рендеру только их значений', () => {
  fc.assert(
    fc
      .property(componentNameArbitrary, propsWithKeysSliceArbitrary, (componentName, [props, keys]) => {
        const [TestComponent, makeComponentContent] = makeFakeComponent(componentName, keys)

        const { getByText } = render(<TestComponent {...props} />)

        expect(getByText(makeComponentContent(pick(props, keys)))).toBeInTheDocument()
      })
      .afterEach(cleanup)
  )
})
