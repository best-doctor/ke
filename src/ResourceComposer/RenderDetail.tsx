import * as React from 'react'
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/core'
import * as GridLayout from 'react-grid-layout'
import { useParams } from 'react-router-dom'

import type { ReactNode } from 'react'
import type { BaseAdmin } from 'admin'
import type { BaseProvider } from 'admin/providers'

import { mountComponents } from '../utils/mountComponents'
import { ToListViewLink } from '../components/ToListViewLink'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)

export const RenderDetail: React.FC<{
  name: string
  admin: BaseAdmin
  additionalComponents: Array<ReactNode>
  provider: BaseProvider
}> = ({ name, admin, additionalComponents, provider }) => {
  const [object, setObject] = useState<Model>()
  const { id } = useParams<{ id: string }>()
  const toast = useToast()

  useEffect(() => {
    provider.getObject(admin.baseUrl, id).then((res) => setObject(res))
  }, [id, provider, admin.baseUrl])

  return (
    <>
      <ToListViewLink name={name} />
      <ReactGridLayout key="maingrid" className="layout" cols={12} rowHeight={30}>
        {mountComponents(object, admin.detail_fields)}
      </ReactGridLayout>
      {object &&
        additionalComponents.map((MyComponent: any) => (
          <MyComponent detailObject={object} setObject={setObject} toast={toast} provider={provider} />
        ))}
    </>
  )
}
