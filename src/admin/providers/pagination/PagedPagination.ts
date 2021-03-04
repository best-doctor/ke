import type { Pagination, PaginationHasNextProps } from './interfaces'

type PagedPaginationMeta = {
  page: number
  per_page: number
  total?: number | null
  url: string
  next_url?: string | null
  prev_url?: string | null
}

class PagedPagination implements Pagination {
  constructor(private readonly meta: PagedPaginationMeta) {
    this.meta = meta
  }

  get page(): number {
    return this.meta.page
  }

  get perPage(): number {
    return this.meta.per_page
  }

  get nextUrl(): string | null | undefined {
    return this.meta.next_url
  }

  get prevUrl(): string | null | undefined {
    return this.meta.prev_url
  }

  get count(): number | null | undefined {
    return this.meta.total
  }

  hasNext(props: PaginationHasNextProps): boolean {
    const { endPage } = props
    return this.nextUrl != null && (endPage == null || (endPage != null && this.meta.page > endPage))
  }
}

export { PagedPagination, PagedPaginationMeta }
