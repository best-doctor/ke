import { CursorPagination, CursorPaginationMeta } from './CursorPagination'

const testMeta: CursorPaginationMeta = {
  after_url: 'https://some_after_url.bestdoctor.ru',
  before_url: 'https://some_before_url.bestdoctor.ru',
  has_next: true,
  per_page: 20,
  total: 100,
  url: 'https://some_url.bestdoctor.ru',
}

test.each([[true], [false]])('Cursor paginator hasNext', (hasNext) => {
  const meta = { ...testMeta }
  meta.has_next = hasNext
  const paginator = new CursorPagination(meta)

  const resultHasNext = paginator.hasNext()

  expect(resultHasNext).toEqual(hasNext)
})

test('Cursor paginator perPage', () => {
  const paginator = new CursorPagination(testMeta)

  const { perPage } = paginator

  expect(perPage).toEqual(20)
})

test('Cursor paginator count', () => {
  const paginator = new CursorPagination(testMeta)

  const { count } = paginator

  expect(count).toEqual(100)
})

test.each([['https://some_after_url.bestdoctor.ru'], [null]])('Cursor paginator nextUrl', (nextUrl) => {
  const meta = { ...testMeta }
  meta.after_url = nextUrl
  const paginator = new CursorPagination(meta)

  const resultNextUrl = paginator.nextUrl

  expect(resultNextUrl).toEqual(nextUrl)
})

test.each([['https://some_before_url.bestdoctor.ru'], [null]])('Cursor paginator prevUrl', (prevUrl) => {
  const meta = { ...testMeta }
  meta.before_url = prevUrl
  const paginator = new CursorPagination(meta)

  const resultPrevUrl = paginator.prevUrl

  expect(resultPrevUrl).toEqual(prevUrl)
})
