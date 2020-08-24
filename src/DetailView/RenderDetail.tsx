import * as React from 'react'
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/core'
import * as GridLayout from 'react-grid-layout'
import { useParams } from 'react-router-dom'

import type { BaseAdmin } from 'admin'
import type { BaseProvider } from 'admin/providers'
import type { BaseAnalytic } from 'integration/analytics/base'

import { mountWizards } from '../WizardMaster/utils'
import { mountDetailFields } from './mountDetailFields'
import { ChakraUINotifier } from '../common/notifier'
import { ToListViewLink } from './components/ToListViewLink'

const ReactGridLayout = GridLayout.WidthProvider(GridLayout)
const ViewType = 'detail_view'

type RenderDetailProps = {
  resourceName: string
  admin: BaseAdmin
  provider: BaseProvider
  user: any
  analytics: BaseAnalytic | undefined
}

const RenderDetail = (props: RenderDetailProps): JSX.Element => {
  const [object, setObject] = useState<Model>()
  const { id } = useParams<{ id: string }>()
  const toast = useToast()
  const notifier = new ChakraUINotifier(toast)

  const { resourceName, admin, provider } = props

  document.title = `${admin.verboseName} # ${id}`

  useEffect(() => {
    provider.getObject(admin.baseUrl, id).then((res) => setObject(res))
  }, [id, provider, admin.baseUrl])

  const containersToMount = {
    detail_fields: mountDetailFields,
    wizards: mountWizards,
  }

  return (
    <>
      <ToListViewLink name={resourceName} />

      <ReactGridLayout key="maingrid" className="layout" cols={12} rowHeight={30}>
        {object &&
          Object.entries(containersToMount).map(([elementsKey, container]: [string, Function]) => {
            const elements = admin[elementsKey as keyof typeof admin]
            if (!elements) return []

            return container({ object, setObject, notifier, ViewType, elements, ...props })
          })}
      </ReactGridLayout>
    </>
  )
}

export { RenderDetail }
