export interface SourceData<T, FetchParams = undefined> {
  data: T
  pending: boolean
  lastFetch: FetchMeta<FetchParams> | null
}

export interface FetchMeta<FetchParams = undefined> {
  madeAt: Date
  params: FetchParams | undefined
}
