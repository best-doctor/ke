import { getData, getWidgetContent, getPayload } from '../dataAccess'

const detailObject = {
  id: 100500,
  last_name: 'test',
}

const mockEvent = {
  target: {
    value: 'kek',
  }
}

test.each([
  [(object: any) => object.id, 100500],
  ['some data', 'some data'],
  [undefined, null],
])('getData', (handler, expectedResult) => {
  const result = getData(handler, detailObject)

  expect(result).toEqual(expectedResult)
})

test.each([
  ['id', (object: any) => object.last_name, 'test'],
  ['id', (object: any) => object.id, 100500],
  ['id', undefined, 100500],
])('getWidgetContent', (name, handler, expectedResult) => {
  const result = getWidgetContent(name, detailObject, handler)

  expect(result).toEqual(expectedResult)
})

test.each([
  ['some_field', (e: any) => ({ id:  e.target.value }), { id: 'kek' }],
  ['some_field', undefined, { 'some_field': 'kek' }],
])('getPayload', (name, targetPayload, expectedResult) => {
  const result = getPayload(mockEvent, name, targetPayload)

  expect(result).toEqual(expectedResult)
})
