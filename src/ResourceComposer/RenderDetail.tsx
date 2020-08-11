import * as React from 'react'
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/core'
import * as GridLayout from 'react-grid-layout'
import { useParams } from 'react-router-dom'

import type { BaseAdmin } from 'admin'
import type { BaseProvider } from 'admin/providers'
import type { BaseAnalytic } from 'integration/analytics/base'

import { mountComponents } from '../utils/mountComponents'
import { ChakraUINotifier } from '../utils/notifier'
import { ToListViewLink } from '../components/ToListViewLink'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)

type RenderDetailProps = {
  resourceName: string
  admin: BaseAdmin
  provider: BaseProvider
  user: any
  analytics: BaseAnalytic | undefined
}

const ViewType = 'detail_view'

export const RenderDetail = (props: RenderDetailProps) => {
  const [object, setObject] = useState<Model>()
  const { id } = useParams<{ id: string }>()
  const toast = useToast()
  const notifier = new ChakraUINotifier(toast)

  const { resourceName, admin, provider, user, analytics } = props

  document.title = `${admin.verboseName} # ${id}`

  useEffect(() => {
    provider.getObject(admin.baseUrl, id).then((res) => setObject(res))
  }, [id, provider, admin.baseUrl])

  return (
    <>
      <ToListViewLink name={resourceName} />

      <ReactGridLayout key="maingrid" className="layout" cols={12} rowHeight={30}>
        {object &&
          mountComponents(
            resourceName,
            object,
            admin.detail_fields,
            provider,
            setObject,
            notifier,
            user,
            analytics,
            ViewType
          )}
      </ReactGridLayout>
    </>
  )
}
