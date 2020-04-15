import * as React from 'react'
import type { ReactNode } from 'react'

import type { adminSettings, adminSettingsElement } from 'typing'
import type { FieldDescription } from 'admin/fields/FieldDescription'
import { parseAdminSettings } from 'utils/adminSettingsParser'

const matchResponseWithAdminFields = (objects: any, adminFields: FieldDescription[]): Array<adminSettings> => {
  const settings: Array<adminSettings> = []

  if (objects instanceof Array) {
    objects.forEach((element: any) => {
      settings.push(parseAdminSettings(adminFields, element))
    })
  } else {
    settings.push(parseAdminSettings(adminFields, objects))
  }

  return settings
}

const mountComponents = (objects: any, adminFields: FieldDescription[]): Array<ReactNode> => {
  if (!objects) {
    return []
  }

  const settings = matchResponseWithAdminFields(objects, adminFields)

  const components: Array<ReactNode> = settings.map((settingsElement: adminSettings) => {
    return settingsElement.map((adminElement: adminSettingsElement) => {
      const MyComponent: any = adminElement.widget

      return (
        <MyComponent key={adminElement.name} data-grid={adminElement.layout_data}>
          {adminElement.flat_data}
        </MyComponent>
      )
    })
  })

  return components
}

export { mountComponents }
