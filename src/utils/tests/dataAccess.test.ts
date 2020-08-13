import { getData, getWidgetContent, getPayload } from '../dataAccess'

type DetailObject = { id: number; last_name: string }

type MockEvent = { target: { value: string } }

const detailObject = {
  id: 100500,
  last_name: 'test',
}

const mockEvent = {
  target: {
    value: 'kek',
  },
}

test.each([
  [(object: DetailObject) => object.id, 100500],
  ['some data', 'some data'],
  [undefined, null],
])('getData', (handler, expectedResult) => {
  const result = getData(handler, detailObject)

  expect(result).toEqual(expectedResult)
})

test.each([
  ['id', (object: DetailObject) => object.last_name, 'test'],
  ['id', (object: DetailObject) => object.id, 100500],
  ['id', undefined, 100500],
])('getWidgetContent', (name, handler, expectedResult) => {
  const result = getWidgetContent(name, detailObject, handler)

  expect(result).toEqual(expectedResult)
})

test.each([
  ['some_field', (e: MockEvent) => ({ id: e.target.value }), { id: 'kek' }],
  ['some_field', undefined, { some_field: 'kek' }],
])('getPayload', (name, targetPayload, expectedResult) => {
  const result = getPayload(mockEvent as React.ChangeEvent<HTMLInputElement>, name, targetPayload)

  expect(result).toEqual(expectedResult)
})
