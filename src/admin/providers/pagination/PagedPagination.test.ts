import { PagedPagination, PagedPaginationMeta } from './PagedPagination'

const testMeta: PagedPaginationMeta = {
  next_url: 'https://some_after_url.bestdoctor.ru',
  prev_url: 'https://some_before_url.bestdoctor.ru',
  page: 3,
  per_page: 20,
  total: 100,
  url: 'https://some_url.bestdoctor.ru',
}

test.each([
  [5, 'https://some_after_url.bestdoctor.ru', false],
  [null, 'https://some_after_url.bestdoctor.ru', true],
  [1, null, false],
  [1, 'https://some_after_url.bestdoctor.ru', true],
])('Paged paginator hasNext', (endPage, nextUrl, expectedHasNext) => {
  const meta = { ...testMeta }
  meta.next_url = nextUrl
  const paginator = new PagedPagination(meta)

  const resultHasNext = paginator.hasNext({ endPage })

  expect(resultHasNext).toEqual(expectedHasNext)
})

test('Paged paginator perPage', () => {
  const paginator = new PagedPagination(testMeta)

  const { perPage } = paginator

  expect(perPage).toEqual(20)
})

test('Paged paginator count', () => {
  const paginator = new PagedPagination(testMeta)

  const { count } = paginator

  expect(count).toEqual(100)
})

test.each([['https://some_after_url.bestdoctor.ru'], [null]])('Paged paginator nextUrl', (nextUrl) => {
  const meta = { ...testMeta }
  meta.next_url = nextUrl
  const paginator = new PagedPagination(meta)

  const resultNextUrl = paginator.nextUrl

  expect(resultNextUrl).toEqual(nextUrl)
})

test.each([['https://some_before_url.bestdoctor.ru'], [null]])('Paged paginator prevUrl', (prevUrl) => {
  const meta = { ...testMeta }
  meta.prev_url = prevUrl
  const paginator = new PagedPagination(meta)

  const resultPrevUrl = paginator.prevUrl

  expect(resultPrevUrl).toEqual(prevUrl)
})
