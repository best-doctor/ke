import React from 'react'
import { Box } from '@chakra-ui/react'
import type { DetailFieldDescription } from 'admin/fields/FieldDescription'

import type { Provider } from 'admin/providers/interfaces'
import type { BaseNotifier } from 'common/notifier'
import type { BaseAnalytic } from 'integration/analytics'
import type { DetailObject, FieldsTypeInAdminClass } from 'typing'

import { containerStore } from './store'
import { initDetailViewControllers } from './controllers'
import { mountComponents } from '../common/utils/mountComponents'

type MountDetailFieldsArgs = {
  resourceName: string
  mainDetailObject: DetailObject
  elements: DetailFieldDescription[]
  provider: Provider
  setMainDetailObject: Function
  refreshMainDetailObject: Function
  notifier: BaseNotifier
  user: object
  analytics: BaseAnalytic | undefined
  ViewType: string
  elementsKey: FieldsTypeInAdminClass
}

const mountDetailFields = ({
  resourceName,
  mainDetailObject,
  refreshMainDetailObject,
  elements,
  elementsKey,
  provider,
  setMainDetailObject,
  notifier,
  user,
  analytics,
  ViewType,
}: MountDetailFieldsArgs): JSX.Element => {
  /*
    Function mounts widgets for Detail View.

    Widgets of Detail View type do not use store,
    but immediately send data entered (or selected) by the user
    to the backend (if the widget assumes interaction with the backend) via submitChange handler.
  */
  const [setInitialValue, submitChange] = initDetailViewControllers(provider, setMainDetailObject, notifier)

  return (
    <Box pb={8} key={elementsKey}>
      {mountComponents({
        setInitialValue,
        submitChange,
        resourceName,
        mainDetailObject,
        refreshMainDetailObject,
        elements,
        provider,
        setMainDetailObject,
        notifier,
        user,
        analytics,
        ViewType,
        containerStore,
      })}
    </Box>
  )
}

export { mountDetailFields }
