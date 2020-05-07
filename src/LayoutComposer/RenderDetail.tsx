import * as React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useToast } from '@chakra-ui/core'
import * as GridLayout from 'react-grid-layout'

import { mountComponents } from 'utils/mountComponents'
import type { BaseAdmin } from 'admin'
import type { ReactNode } from 'react'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)

export const RenderDetail: React.FC<{ admin: BaseAdmin; additionalComponents: Array<ReactNode> }> = ({
  admin,
  additionalComponents,
}) => {
  const [object, setObject] = useState<Model>()
  const { id } = useParams<{ id: string }>()
  const toast = useToast()

  useEffect(() => {
    admin.provider.getObject(id).then((res) => setObject(res))
  }, [admin.provider, id])

  return (
    <>
      <ReactGridLayout key="maingrid" className="layout" cols={12} rowHeight={30}>
        {mountComponents(object, admin.detail_fields)}
      </ReactGridLayout>
      {object && additionalComponents.map((MyComponent: any) => <MyComponent detailObject={object} toast={toast} />)}
    </>
  )
}
