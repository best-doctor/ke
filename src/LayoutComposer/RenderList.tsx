import * as React from 'react'
import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/core'

import type { BaseAdmin } from 'admin'
import { Table } from './components/Table'
import { SideBar } from './components/SideBar'

export const RenderList: React.FC<{ admin: BaseAdmin }> = ({ admin }) => {
  const [objects, setObjects] = useState<Model[]>([])

  const [filters, setFilters] = useState([])

  useEffect(() => {
    admin.provider.getList(filters).then(setObjects)
  }, [admin.provider, filters])

  return (
    <>
      <Flex>
        <SideBar />
        {objects && <Table data={objects} columns={admin.list_fields} setBackendFilters={setFilters} />}
      </Flex>
    </>
  )
}
