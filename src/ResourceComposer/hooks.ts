import React, { useMemo } from 'react'
import { hasPermissions } from '../common/permissions'
import { ResourceComposerChildType } from './types'
import { isCompatibleResourceElement, isAdminResourceElement } from './utils'
import { getAccessor } from '../DetailView/utils/dataAccess'

export const useResourcesMenu = (
  resources: ResourceComposerChildType | (ResourceComposerChildType | false)[] | false,
  permissions: string[]
): Array<{ title: string; path: string }> => {
  const menuItems = useMemo(
    () =>
      React.Children.map<{ title: string; path: string } | null, ResourceComposerChildType | false>(
        resources,
        (resource) => {
          if (resource && isCompatibleResourceElement(resource)) {
            const { navTitle, path } = resource.props
            return { title: navTitle, path }
          }

          if (resource && isAdminResourceElement(resource)) {
            const { admin, name } = resource.props
            const adminPermissions = admin?.permissions
            const showSideBar = !getAccessor(admin?.hideSideBar)

            if (showSideBar && (!adminPermissions?.length || hasPermissions(permissions, adminPermissions))) {
              return { title: admin.verboseName || name, path: `/${name}/` }
            }
          }
          return null
        }
      ).filter(Boolean),
    [permissions, resources]
  )

  return menuItems
}
