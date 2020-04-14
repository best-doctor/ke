import * as React from 'react'
import { useEffect, useState } from 'react'
import * as ReactGridLayout from 'react-grid-layout'
import type { ReactNode } from 'react'

import { parseAdminSettings } from 'utils/adminSettingsParser'
import type { adminSettings, adminSettingsElement } from 'typing'
import type { BaseAdmin } from 'admin'

const mountComponents = (objects: any, admin: BaseAdmin): any => {
  const settings: Array<adminSettings> = []
  const components: Array<ReactNode> = []

  objects.forEach((element: any) => {
    settings.push(parseAdminSettings(admin, element))
  })

  settings.forEach((settingsElement: adminSettings) => {
    settingsElement.forEach((adminElement: adminSettingsElement) => {
      const MyComponent: any = adminElement.widget

      components.push(
        <MyComponent key={adminElement.name} data-grid={adminElement.layout_data}>
          {adminElement.flat_data}
        </MyComponent>
      )
    })
  })

  return components
}

export const RenderList: React.FC<{ admin: BaseAdmin }> = ({ admin }) => {
  const [objects, setObjects] = useState<Model[]>([])

  useEffect(() => {
    admin.provider.getList().then(setObjects)
  }, [admin.provider])

  return (
    <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200}>
      {mountComponents(objects, admin)}
    </ReactGridLayout>
  )
}
