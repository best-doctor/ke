type Filter = {
  name: string
  value: string
  filterOperation: string | undefined
}

type TableFilter = {
  id: string
  value: Filter
}

export abstract class BaseProvider {
  abstract url: string

  abstract http: any

  getFilterQuery = (filter: Filter): [string, string] => {
    const { name, value, filterOperation } = filter

    let filterQuery = name.toString()

    if (filterOperation) {
      filterQuery = `${name}__${filterOperation}`
    }

    return [filterQuery, value]
  }

  getUrl = (filters: Array<TableFilter> | null = null, page: number | null = null): string => {
    const url = new URL(`${this.http.defaults.baseURL}${this.url}`)

    if (filters) {
      filters.forEach((element: TableFilter) => {
        const [filter, value] = this.getFilterQuery(element.value)
        url.searchParams.set(filter, value)
      })
    }

    if (page) {
      url.searchParams.set('page', page.toString())
    }

    return url.href
  }

  getList = async (filters: Array<TableFilter> | null = null, page: number | null = null): Promise<Model[]> => {
    const url = this.getUrl(filters, page)

    const response = await this.http.get(url)
    return response.data.data
  }

  getObject = async (objectId: string): Promise<Model> => {
    const response = await this.http.get(this.url + objectId)
    return response.data.data
  }
}
