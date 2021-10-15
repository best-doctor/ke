import React, { useEffect, useState } from 'react'
import { useToast, Box, Spinner, Alert, AlertTitle, AlertIcon, AlertDescription } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-flexbox-grid'

import type { BaseAdmin } from 'admin'
import type { Provider } from 'admin/providers/interfaces'
import type { BaseAnalytic } from 'integration/analytics/base'
import type { FieldsTypeInAdminClass } from 'typing'

import { mountWizards } from '../WizardMaster/mountWizards'
import { mountWizards as updatedMountWizards } from '../Wizard/mountWizards'
import { mountDetailFields } from './mountDetailFields'
import { BaseNotifier, ChakraUINotifier } from '../common/notifier'
import { ToListViewLink } from './components/ToListViewLink'
import { setFavicon } from '../Browser/Favicon'
import { ErrorBoundary } from '../common/components/ErrorBoundary'
import { containerStore } from './store'
import { setInitialValue } from './events'
import { useCreateTestId } from '../django-spa/aspects'

const ViewType = 'detail_view'

type BackendResourceName = string

type RenderDetailProps = {
  resourceName: BackendResourceName
  admin: BaseAdmin
  provider: Provider
  user: object
  analytics: BaseAnalytic | undefined
  notifier?: BaseNotifier
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
  const { resourceName, admin, provider, notifier } = props
  const toast = useToast()
  const detailNotifier = notifier || new ChakraUINotifier(toast)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadError, setLoadError] = useState<LoadError | null>(null)

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
    if (needRefreshDetailObject) {
      provider
        .getObject(backendResourceUrl)
        .then(async (res) => {
          setNeedRefreshDetailObject(false)
          setMainDetailObject(res)
          if (admin?.onDetailObjectLoaded !== undefined) {
            await admin.onDetailObjectLoaded({
              mainDetailObject: res,
              provider,
              context: containerStore,
              setInitialValue,
            })
          }
        })
        .catch((er: LoadError) => {
          setLoadError(er)
        })
        .finally(() => setIsLoading(false))
    }
  }, [id, provider, admin, needRefreshDetailObject, props, mainDetailObject])

  const { getDataTestId } = useCreateTestId({ name: admin.name })

  return (
    <>
      <Row>
        <Col xs={12} xsOffset={0} md={10} mdOffset={1}>
          <Box padding="8px 0px">
            <ToListViewLink name={resourceName} />
          </Box>
        </Col>
      </Row>
      <Row {...getDataTestId()}>
        <Col xs={12} xsOffset={0} md={10} mdOffset={1}>
          {isLoading ? <Spinner /> : ''}
          {!isLoading && !loadError
            ? Object.entries(getContainersToMount()).map(([elementsKey, container]: [string, Function]) => {
                const elements = admin[elementsKey as keyof typeof admin]
                if (!elements) return []

                return (
                  <ErrorBoundary>
                    {container({
                      mainDetailObject,
                      setMainDetailObject,
                      ViewType,
                      elements,
                      elementsKey,
                      refreshMainDetailObject,
                      ...props,
                      notifier: detailNotifier,
                    })}
                  </ErrorBoundary>
                )
              })
            : ''}
          {!isLoading && loadError ? (
            <Alert status="error" {...getDataTestId({ postfix: '--loadingError' })}>
              <AlertIcon />
              <AlertTitle mr={2}>Ошибка при выполнении запроса</AlertTitle>
              <AlertDescription>{loadError.response?.data?.message}</AlertDescription>
            </Alert>
          ) : (
            ''
          )}
        </Col>
      </Row>
    </>
  )
}

interface LoadError extends Error {
  response?: {
    data?: {
      message?: string
    }
  }
}

export { RenderDetail }
