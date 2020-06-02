import * as React from 'react'
import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/core'

import type { BaseAdmin } from 'admin'
import type { Pagination, TableFilter } from '../admin/providers'
import { Table } from './components/Table'
import { SideBar } from './components/SideBar'

export const RenderList: React.FC<{ admin: BaseAdmin }> = ({ admin }) => {
  const [objects, setObjects] = useState<Model[]>([])

  const [filters, setFilters] = useState([])

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
    admin.provider.getList(filters, page).then(processBackendResponse)
  }, [admin.provider, filters, page])

  return (
    <Flex>
      <SideBar />
      {objects && (
        <Table
          data={objects}
          columns={admin.list_fields}
          pageCount={pageCount}
          backendPagination={pagination}
          setBackendFilters={setFilters}
          setBackendPage={setPage}
        />
      )}
    </Flex>
  )
}
