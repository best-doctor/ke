import * as React from 'react'
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/core'
import * as GridLayout from 'react-grid-layout'
import { useParams } from 'react-router-dom'

import type { BaseAdmin } from 'admin'
import type { BaseProvider } from 'admin/providers'
import type { BaseAnalytic } from 'integration/analytics/base'

import { mountComponents } from '../utils/mountComponents'
import { ToListViewLink } from '../components/ToListViewLink'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)

export const RenderDetail: React.FC<{
  resourceName: string
  admin: BaseAdmin
  provider: BaseProvider
  user: any
  analytics: BaseAnalytic | undefined
}> = ({ resourceName, admin, provider, user, analytics }) => {
  const [object, setObject] = useState<Model>()
  const { id } = useParams<{ id: string }>()
  const toast = useToast()

  document.title = `${admin.verboseName} # ${id}`
  const viewType = 'detail_view'

  const notifier = (eventType: string): void => {
    const defaultNotification = {
      notificationTitle: 'Обновлено',
      notificationStatus: 'success',
    }
    const errorNotification = {
      notificationTitle: 'Ошибка',
      notificationStatus: 'error',
    }

    const statusMapping = new Map([
      ['success', defaultNotification],
      ['error', errorNotification],
    ])
    const { notificationTitle, notificationStatus }: { notificationTitle: string; notificationStatus: string } =
      statusMapping.get(eventType) || defaultNotification

    return toast({
      title: notificationTitle,
      position: 'top',
      // eslint-disable-next-line
      // @ts-ignore
      status: notificationStatus,
      duration: 9000,
      isClosable: true,
    })
  }

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
            viewType
          )}
      </ReactGridLayout>
    </>
  )
}
