import React, { FC, ReactElement, Key, ReactChild } from 'react'
import { fc } from 'jest-fast-check'
import { expectType } from 'tsd'
import { cleanup, render, within } from '@testing-library/react'

import { makeList } from './makeList'

const propsArbitrary = fc
  .dictionary(fc.string(), fc.anything())
  .filter((props) => !Object.keys(props).includes('children'))

const uniqArrayArbitrary = fc.array(fc.lorem({ mode: 'words' })).map((arr) => [...new Set(arr).values()])
const itemsArbitrary = uniqArrayArbitrary.map((arr) => arr.map((el) => ({ content: el })))

// Тестируем обёртки с динамическим пропсами
/* eslint-disable react/jsx-props-no-spreading */
test('Создаваемый макет рендерит контейнер с переданными props', () => {
  fc.assert(
    fc
      .property(propsArbitrary, fc.lorem(), (props, containerContent) => {
        const containerSpy = jest.fn().mockReturnValue(containerContent)
        const Layout = makeList(containerSpy, jest.fn())

        const { getByText } = render(<Layout {...props} />)

        expect(getByText(containerContent)).toBeInTheDocument()
        expect(containerSpy).toHaveBeenCalledTimes(1)
        expect(containerSpy).toHaveBeenCalledWith({ ...props, children: [] }, {})
      })
      .afterEach(cleanup)
  )
})

test('Создаваемый макет рендерит элементы в полученном порядке', () => {
  fc.assert(
    fc
      .property(itemsArbitrary, (items) => {
        const Container: FC = ({ children }) => <ul>{children}</ul>
        const Item: FC = ({ children }) => <li>{children}</li>
        const Layout = makeList(Container, Item)

        const { getByText, container } = render(<Layout>{items}</Layout>)
        const itemElements = items.map(({ content }) => getByText(content))

        expect([...(container.firstChild?.childNodes.values() ?? [])]).toEqual(itemElements)
      })
      .afterEach(cleanup)
  )
})

test('Создаваемый макет рендерит все элементы внутри контейнера', () => {
  fc.assert(
    fc
      .property(itemsArbitrary, (items) => {
        const id = 'container'
        const Container: FC = ({ children }) => <ul data-testid={id}>{children}</ul>
        const Item: FC = ({ children }) => <li>{children}</li>
        const Layout = makeList(Container, Item)

        const { getByTestId } = render(<Layout>{items}</Layout>)
        const container = getByTestId(id)
        const { getByText } = within(container)

        items.forEach(({ content }) => {
          expect(getByText(content)).toBeInTheDocument()
        })
      })
      .afterEach(cleanup)
  )
})

test('Создаваемый макет рендерит каждый элемент внутри обёртки', () => {
  fc.assert(
    fc
      .property(itemsArbitrary, (items) => {
        const id = 'item'
        const Container: FC = ({ children }) => <ul>{children}</ul>
        const Item: FC = ({ children }) => <li data-testid={id}>{children}</li>
        const Layout = makeList(Container, Item)

        const { getByText } = render(<Layout>{items}</Layout>)

        items.forEach(({ content }) => {
          const item = getByText(content)
          expect(item.dataset.testid).toBe(id)
        })
      })
      .afterEach(cleanup)
  )
})
/* eslint-enable react/jsx-props-no-spreading */

test('У создаваемого макета ожидаемый тип', () => {
  const container = jest.fn() as FC<{ a: string }>
  const item = jest.fn() as FC<{ b: number }>

  expectType<(props: { children: { key?: Key; content: ReactChild; b: number }[]; a: string }) => ReactElement>(
    makeList(container, item)
  )
})
