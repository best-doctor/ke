import React, { FC } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { makeFakeComponent } from '@test-utils/fake-components'

import { SelectListPattern } from './SelectListPattern'

const testItems = ['a', 'b', 'c', 'd']
const testData = {
  items: testItems,
  total: testItems.length,
}
const testSelected = testItems.slice(0, 2)

const testStatus = {
  isLoading: true,
  isNotLoaded: false,
} as const

const testParams = [
  {
    filters: undefined,
    order: undefined,
    pagination: { currentPage: 0, itemsPerPage: 10 },
  },
  () => undefined,
] as const

const setSelectedButtonLabel = 'SET SELECTED'

const [TestData, testDataContent] = makeFakeComponent('TestData', ['items', 'selected'])

const TestSelected: FC<{ selected: string[]; onSelectedChange: (s: string[]) => void; changedSelected: string[] }> = ({
  onSelectedChange,
  changedSelected,
}) => (
  <button type="button" onClick={() => onSelectedChange(changedSelected)}>
    {setSelectedButtonLabel}
  </button>
)

test('Поднабор элементов выбирается корректно', () => {
  const { getByText } = render(
    <SelectListPattern data={testData} status={testStatus} params={testParams} getKey={(item) => item}>
      <SelectListPattern.Data as={TestData} />
      <SelectListPattern.Selected as={TestSelected} changedSelected={testSelected} />
    </SelectListPattern>
  )

  fireEvent.click(getByText(setSelectedButtonLabel))

  expect(getByText(testDataContent({ items: testItems, selected: testSelected }))).toBeInTheDocument()
})

test('Элементы не из списка при выборе игнорируются', () => {
  const extTestSelected = [...testSelected, 'INCORRECT_TEST']
  const { getByText } = render(
    <SelectListPattern data={testData} status={testStatus} params={testParams} getKey={(item) => item}>
      <SelectListPattern.Data as={TestData} />
      <SelectListPattern.Selected as={TestSelected} changedSelected={extTestSelected} />
    </SelectListPattern>
  )

  fireEvent.click(getByText(setSelectedButtonLabel))

  expect(getByText(testDataContent({ items: testItems, selected: testSelected }))).toBeInTheDocument()
})
