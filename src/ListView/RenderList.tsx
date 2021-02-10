import * as React from 'react'
import { Flex } from '@chakra-ui/core'
import { useLocation } from 'react-router-dom'

import type { BaseAnalytic } from 'integration/analytics/base'
import type { BaseAdmin } from 'admin'
import type { Provider } from 'admin/providers/interfaces'
import type { Pagination, TableFilter } from '../admin/providers/interfaces'

import { Table } from './components/Table'
import { FilterManager } from '../common/filterManager'

/**
 * Async load models and render them as paginated table.
 * Change page title.
 *
 * @param resourceName - using for analytics
 * @param admin - meta-information fo rendered models
 * @param provider - used for requests to backend
 * @param user - used for filter query
 * @param analytics - for send analytics event
 */
export const RenderList: React.FC<{
  resourceName: string
  admin: BaseAdmin
  provider: Provider
  user: any
  analytics: BaseAnalytic | undefined
}> = ({ resourceName, admin, provider, user, analytics }) => {
  document.title = `${admin.verboseName}`
  const location = useLocation()

  const [objects, setObjects] = React.useState<Model[]>([])
  const [pagination, setPagination] = React.useState<Pagination>()
  const [pageCount, setPageCount] = React.useState(0)
  const [page, setPage] = React.useState(1)

  const processBackendResponse = ([backendData, , backendPagination]: [
    Model[],
    Array<TableFilter>,
    Pagination
  ]): void => {
    setObjects(backendData)
    setPagination(backendPagination)

    if (backendPagination?.count) {
      setPageCount(Math.ceil(backendPagination.count / backendPagination.perPage))
    }
  }

  React.useEffect(() => {
    const resource = admin.getResource()
    const filters = FilterManager.getFilters(location.search)
    provider.getPage(resource, filters, page).then(processBackendResponse)
  }, [admin, provider, page, location])

  return (
    <Flex>
      {objects && (
        <Table
          resourceName={resourceName}
          data={objects}
          listFilterTemplates={admin.list_filter_templates}
          listFilters={admin.list_filters}
          columns={admin.list_fields}
          pageCount={pageCount}
          backendPagination={pagination}
          setBackendPage={setPage}
          user={user}
          filterable
          analytics={analytics}
          provider={provider}
        />
      )}
    </Flex>
  )
}
