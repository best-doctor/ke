type PaginationHasNextProps = {
  endPage?: number | null
}

type PagedPaginationParameters = {
  perPage?: number
  page?: number
}

type CursorPaginationParameters = {
  perPage?: number
  before?: string | null
  after?: string | null
}

type PaginationParameters = PagedPaginationParameters | CursorPaginationParameters

interface Pagination {
  perPage: number
  nextUrl?: string | null
  prevUrl?: string | null
  count?: number | null

  hasNext(props: PaginationHasNextProps): boolean
}

export { Pagination, PaginationHasNextProps, PaginationParameters }
