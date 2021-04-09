import { SyncReadWriteProvider } from '@cdk/Providers'

class LocationSearch implements SyncReadWriteProvider<URLSearchParams> {
  constructor(private readonly history: History, private readonly location: Location) {}

  read(): URLSearchParams {
    return new URLSearchParams(this.location.search)
  }

  write(value: URLSearchParams): void {
    const urlSearch = value.toString()
    this.history.pushState({}, '', urlSearch ? `?${urlSearch}` : '')
  }
}

export const locationSearchProvider = new LocationSearch(window.history, window.location)
