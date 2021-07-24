import React, { ComponentProps } from 'react'
import { fireEvent, render, waitFor, findByText, getByText, queryByText } from '@testing-library/react'
import { AsyncDualSelectWidget } from './AsyncDualSelectWidget'
import { mockedEffectorContainerStore, testProvider } from '../../../setupTests'

type Props = ComponentProps<typeof AsyncDualSelectWidget>
type Item = { id: number; name: string }

const defaultProps: Partial<Props> = {
  containerStore: mockedEffectorContainerStore,
  dataResourceUrl: '/test',
  name: 'test',
  mainDetailObject: {
    test: [],
  },
  resource: 'test',
  targetPayload: () => '/test-payload',
  submitChange: (_: any) => {},
  getOptionLabel: (object: object | null) => (object as Item)?.name ?? '',
  getOptionValue: (object: object | null) => ((object as Item)?.id ?? '').toString(),
  provider: testProvider,
}

const items: Item[] = [
  { id: 1, name: 'test' },
  { id: 2, name: 'peretest' },
]

beforeEach(() => {
  testProvider.getPage = jest.fn((_: any, __: any) => Promise.resolve([items, undefined, {}]) as any)
})

test('It should render values from server', async () => {
  const screen = render(<AsyncDualSelectWidget {...(defaultProps as any)} />)
  await waitFor(() => screen.findByText('test'))
  expect(screen.getByText('test')).toBeDefined()
  expect(screen.getByText('peretest')).toBeDefined()
})

test('It should handle change', async () => {
  defaultProps.submitChange = jest.fn()
  const handleChange = defaultProps.submitChange
  const screen = render(<AsyncDualSelectWidget {...(defaultProps as any)} />)
  await waitFor(() => screen.findByText('test'))
  const testOption = screen.getByText('test')
  const selectButton = screen.getByText('SELECT')
  fireEvent.click(testOption)
  fireEvent.click(selectButton)
  expect(handleChange).toBeCalled()
})

test('It should move the item from the left list to the right list', async () => {
  const screen = render(<AsyncDualSelectWidget {...(defaultProps as any)} />)

  await waitFor(() => screen.findByText('test'))

  const leftList = screen.queryByTestId('ds-left-list')
  await waitFor(() => findByText(leftList as HTMLElement, 'test'))
  expect(leftList?.textContent).toContain('test')

  const testOption = screen.getByText('test')
  const selectButton = screen.getByText('SELECT')
  fireEvent.click(testOption)
  fireEvent.click(selectButton)

  const rightList = screen.queryByTestId('ds-right-list')
  expect(getByText(rightList as HTMLElement, 'test')).not.toBeNull()
  expect(queryByText(leftList as HTMLElement, 'test')).toBeNull()
})
