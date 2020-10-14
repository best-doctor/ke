import * as React from 'react'
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/core'
import { useParams } from 'react-router-dom'

import type { BaseAdmin } from 'admin'
import type { BaseProvider } from 'admin/providers'
import type { BaseAnalytic } from 'integration/analytics/base'
import type { FieldsTypeInAdminClass } from 'typing'

import { mountWizards } from '../WizardMaster/mountWizards'
import { mountDetailFields } from './mountDetailFields'
import { ChakraUINotifier } from '../common/notifier'
import { ToListViewLink } from './components/ToListViewLink'

const ViewType = 'detail_view'

type BackendResourceName = string

type RenderDetailProps = {
  resourceName: BackendResourceName
  admin: BaseAdmin
  provider: BaseProvider
  user: object
  analytics: BaseAnalytic | undefined
}

const getContainersToMount = (): { [key in FieldsTypeInAdminClass]: Function } => {
  /*
    Takes a handler that will embed objects for a specific type of fields.

    Types of fields can be viewed in BaseAdmin class
  */
  return {
    detail_fields: mountDetailFields,
    wizards: mountWizards,
    additional_detail_widgets: mountDetailFields,
  }
}

const RenderDetail = (props: RenderDetailProps): JSX.Element => {
  /*
    Entry point for displaying components in https://myspa.com/some-url/100500 route format.

    Here we fetch data from the backend using the url that we specified in a
    admin class.

    After that we mounts the widgets of a particular view type. At the moment there are two:
    - Detail View (see mountDetailFields for detail)
    - Wizard View (see mountWizards for detail)
  */
  const [mainDetailObject, setMainDetailObject] = useState<Model>()
  const { id } = useParams<{ id: string }>()
  const toast = useToast()
  const notifier = new ChakraUINotifier(toast)

  const { resourceName, admin, provider } = props

  document.title = `${admin.verboseName} # ${id}`

  useEffect(() => {
    const backendResourceUrl = admin.getResource(id)
    provider.getObject(backendResourceUrl).then((res) => setMainDetailObject(res))
  }, [id, provider, admin])

  return (
    <>
      <ToListViewLink name={resourceName} />
      {mainDetailObject &&
        Object.entries(getContainersToMount()).map(([elementsKey, container]: [string, Function]) => {
          const elements = admin[elementsKey as keyof typeof admin]
          if (!elements) return []

          return container({
            mainDetailObject,
            setMainDetailObject,
            notifier,
            ViewType,
            elements,
            elementsKey,
            ...props,
          })
        })}
    </>
  )
}

export { RenderDetail }
