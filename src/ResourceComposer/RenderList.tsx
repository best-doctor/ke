import * as React from 'react'
import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/core'
import { useLocation } from 'react-router-dom'

import type { BaseAdmin } from 'admin'
import type { BaseProvider } from 'admin/providers'
import type { Pagination, TableFilter } from '../admin/providers'

import { Table } from '../components/Table'
import { SideBar } from '../components/SideBar'
import { FilterManager } from '../utils/filterManager'

export const RenderList: React.FC<{ admin: BaseAdmin; provider: BaseProvider }> = ({ admin, provider }) => {
  const location = useLocation();

  const [objects, setObjects] = useState<Model[]>([])
  const [pagination, setPagination] = useState<Pagination>()
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(1)

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

  useEffect(() => {
    const filters = FilterManager.getFilters(location.search)
    provider.getList(admin.baseUrl, filters, page).then(processBackendResponse)
  }, [admin.baseUrl, provider, page, location])

  return (
    <Flex>
      <SideBar />
      {objects && (
        <Table
          data={objects}
          columns={admin.list_fields}
          pageCount={pageCount}
          backendPagination={pagination}
          setBackendPage={setPage}
          filterable
        />
      )}
    </Flex>
  )
}
