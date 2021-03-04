import type { Pagination } from './interfaces'

type CursorPaginationMeta = {
  per_page: number
  total: number | null
  url: string
  has_next: boolean
  after_url?: string | null
  before_url?: string | null
  before?: null
  after?: null
}

class CursorPagination implements Pagination {
  constructor(private readonly meta: CursorPaginationMeta) {
    this.meta = meta
  }

  get before(): null | undefined | string {
    return this.meta.before
  }

  get after(): null | undefined | string {
    return this.meta.after
  }

  get perPage(): number {
    return this.meta.per_page
  }

  get nextUrl(): string | null | undefined {
    return this.meta.after_url
  }

  get prevUrl(): string | null | undefined {
    return this.meta.before_url
  }

  get count(): number | null | undefined {
    return this.meta.total
  }

  hasNext(): boolean {
    return this.meta.has_next
  }
}

export { CursorPagination, CursorPaginationMeta }
