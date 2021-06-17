import React, { useEffect, useState } from 'react'
import { useToast, Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-flexbox-grid'

import type { BaseAdmin } from 'admin'
import type { Provider } from 'admin/providers/interfaces'
import type { BaseAnalytic } from 'integration/analytics/base'
import type { FieldsTypeInAdminClass } from 'typing'

import { mountWizards } from '../WizardMaster/mountWizards'
import { mountWizards as updatedMountWizards } from '../Wizard/mountWizards'
import { mountDetailFields } from './mountDetailFields'
import { ChakraUINotifier } from '../common/notifier'
import { ToListViewLink } from './components/ToListViewLink'
import { setFavicon } from '../Browser/Favicon'

const ViewType = 'detail_view'

type BackendResourceName = string

type RenderDetailProps = {
  resourceName: BackendResourceName
  admin: BaseAdmin
  provider: Provider
  user: object
  analytics: BaseAnalytic | undefined
}

const getContainersToMount = (): { [key in FieldsTypeInAdminClass]: Function } =>
  /*
    Takes a handler that will embed objects for a specific type of fields.

    Types of fields can be viewed in BaseAdmin class
  */
  ({
    detail_fields: mountDetailFields,
    wizards: mountWizards,
    updated_wizards: updatedMountWizards,
    additional_detail_widgets: mountDetailFields,
  })

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
  const [needRefreshDetailObject, setNeedRefreshDetailObject] = useState<boolean>(true)
  const { id } = useParams<{ id: string }>()
  const toast = useToast()
  const notifier = new ChakraUINotifier(toast)

  const { resourceName, admin, provider } = props

  let title = `${admin.verboseName} # ${id}`
  if (admin.getPageTitle) {
    const pageTitle = admin.getPageTitle(mainDetailObject)
    if (pageTitle) {
      title = pageTitle
    }
  }
  document.title = title

  let favicon = admin.favicon || ''

  if (admin.getPageFavicon) {
    const favIconSource = admin.getPageFavicon(mainDetailObject)
    if (favIconSource) {
      favicon = favIconSource
    }
  }
  setFavicon(favicon)

  const refreshMainDetailObject = (): void => {
    setNeedRefreshDetailObject(true)
  }

  useEffect(() => {
    const backendResourceUrl = admin.getResource(id)
    provider.getObject(backendResourceUrl).then((res) => {
      setMainDetailObject(res)
      setNeedRefreshDetailObject(false)
    })
  }, [id, provider, admin, needRefreshDetailObject])

  return (
    <>
      <Row>
        <Col xs={12} xsOffset={0} md={10} mdOffset={1}>
          <Box padding="8px 0px">
            <ToListViewLink name={resourceName} />
          </Box>
        </Col>
      </Row>
      <Row>
        <Col xs={12} xsOffset={0} md={10} mdOffset={1}>
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
                refreshMainDetailObject,
                ...props,
              })
            })}
        </Col>
      </Row>
    </>
  )
}

export { RenderDetail }
