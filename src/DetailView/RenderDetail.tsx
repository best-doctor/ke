import * as React from 'react'
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/core'
import { useParams } from 'react-router-dom'

import type { BaseAdmin } from 'admin'
import type { BaseProvider } from 'admin/providers'
import type { BaseAnalytic } from 'integration/analytics/base'

import { mountWizards } from '../WizardMaster/mountWizards'
import { mountDetailFields } from './mountDetailFields'
import { ChakraUINotifier } from '../common/notifier'
import { ToListViewLink } from './components/ToListViewLink'

const ViewType = 'detail_view'

type RenderDetailProps = {
  resourceName: string
  admin: BaseAdmin
  provider: BaseProvider
  user: object
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
    const resource = admin.getResource(id)
    provider.getObject(resource).then((res) => setObject(res))
  }, [id, provider, admin])

  const containersToMount = {
    detail_fields: mountDetailFields,
    wizards: mountWizards,
    additional_detail_widgets: mountDetailFields,
  }

  return (
    <>
      <ToListViewLink name={resourceName} />
      {object &&
        Object.entries(containersToMount).map(([elementsKey, container]: [string, Function]) => {
          const elements = admin[elementsKey as keyof typeof admin]
          if (!elements) return []

          return container({ object, setObject, notifier, ViewType, elements, elementsKey, ...props })
        })}
    </>
  )
}

export { RenderDetail }
