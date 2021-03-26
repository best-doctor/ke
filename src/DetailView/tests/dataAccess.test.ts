import { getData, getWidgetContent, getPayload, ensurePromise, getAccessor } from '../utils/dataAccess'

type DetailObject = { id: number; last_name: string }

const detailObject = {
  id: 100500,
  last_name: 'test',
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
  ['some_field', (value: string) => ({ id: value }), { id: 'kek' }],
  ['some_field', undefined, { some_field: 'kek' }],
])('getPayload', (name, targetPayload, expectedResult) => {
  const result = getPayload('kek', name, targetPayload)

  expect(result).toEqual(expectedResult)
})

test.each([
  ['value', 'value'],
  [new Promise(() => 'value'), 'value'],
  [new Promise(() => detailObject), detailObject],
])('ensurePromise', (value, expectedResult) => {
  const result = ensurePromise(value)

  expect(result).resolves.toBe(expectedResult)
})

test.each([
  ['value', undefined, undefined, 'value'],
  [null, undefined, undefined, null],
  [undefined, undefined, undefined, undefined],
  [() => 'value', undefined, undefined, 'value'],
  [(data: DetailObject) => data.id, detailObject, undefined, 100500],
  [(data: DetailObject, context: DetailObject) => data.id + context.id, detailObject, detailObject, 201000],
  [(_: DetailObject, context: DetailObject) => context.id, detailObject, detailObject, 100500],
])('getAccessor', (value, data, context, expectedResult) => {
  const result = getAccessor(value, data, context)

  expect(result).toBe(expectedResult)
})
