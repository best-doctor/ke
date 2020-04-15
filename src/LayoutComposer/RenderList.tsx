import * as React from 'react'
import { useEffect, useState } from 'react'
import * as GridLayout from 'react-grid-layout'

import { mountComponents } from 'utils/mountComponents'
import type { BaseAdmin } from 'admin'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)

export const RenderList: React.FC<{ admin: BaseAdmin }> = ({ admin }) => {
  const [objects, setObjects] = useState<Model[]>([])

  useEffect(() => {
    admin.provider.getList().then(setObjects)
  }, [admin.provider])

  return (
    <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200}>
      {mountComponents(objects, admin.list_fields)}
    </ReactGridLayout>
  )
}
