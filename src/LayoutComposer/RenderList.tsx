import * as React from 'react'
import { useEffect, useState } from 'react'

import type { BaseAdmin } from 'admin'
import { Table } from './Table'

export const RenderList: React.FC<{ admin: BaseAdmin }> = ({ admin }) => {
  const [objects, setObjects] = useState<Model[]>([])

  useEffect(() => {
    admin.provider.getList().then(setObjects)
  }, [admin.provider])

  return <Table data={objects} columns={admin.list_fields} />
}
