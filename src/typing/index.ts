import type { ReactNode } from 'react'

type LayoutData = {
  x: number
}

type adminSettingsElement = {
  name: string
  flat_data: string
  widget: ReactNode
  layout_data: LayoutData
}

type adminSettings = Array<adminSettingsElement>

export { adminSettings, adminSettingsElement, LayoutData }
