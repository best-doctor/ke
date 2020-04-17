import * as React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as GridLayout from 'react-grid-layout'

import { mountComponents } from 'utils/mountComponents'
import type { BaseAdmin } from 'admin'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)

export const RenderDetail: React.FC<{ admin: BaseAdmin }> = ({ admin }) => {
  const [object, setObject] = useState<Model>()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    admin.provider.getObject(id).then((res) => setObject(res))
  }, [admin.provider, id])

  return (
    <ReactGridLayout className="layout" cols={12} rowHeight={30}>
      {mountComponents(object, admin.detail_fields)}
    </ReactGridLayout>
  )
}
