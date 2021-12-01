import React, { FC } from 'react'
import { Redirect } from 'react-router-dom'
import { SideBarElement } from '../ListView/components/SidebarElement'
import { SideBar } from '../ListView/components/SideBar'
import { TPathRules } from '../ListView/components/Breadcrumbs/Breadcrumbs'
import { mountElement } from '../common/permissions'
import { ForbiddenResource } from './ForbiddenResource'
import { useResourcesMenu } from './hooks'
import { Resource } from './Resource'
import { ResourceComposerChildType } from './types'
import { isAdminResourceElement } from './utils'

interface IResourceComposerProps {
  permissions?: string[]
  withSideBar?: boolean
  breadcrumbsRules?: TPathRules
  initialPageComponent?: React.ReactNode | null
  initialPath?: string
  children: ResourceComposerChildType | (ResourceComposerChildType | false)[] | false
  renderMenu?: (items: { title: string; path: string }[]) => React.ReactNode
}

export const ResourceComposer: FC<IResourceComposerProps> = ({
  children,
  withSideBar = true,
  permissions = [],
  breadcrumbsRules,
  initialPageComponent,
  initialPath,
  renderMenu,
}) => {
  const menuItems = useResourcesMenu(children, permissions)

  if (initialPath) {
    return <Redirect to={initialPath} />
  }

  return (
    <>
      {renderMenu?.(menuItems)}
      {withSideBar && menuItems.length && (
        <SideBar header="Разделы" breadcrumbsRules={breadcrumbsRules}>
          {menuItems.map(SideBarElement)}
        </SideBar>
      )}
      {initialPageComponent && <Resource name="">{initialPageComponent}</Resource>}
      {React.Children.map(children, (resource: ResourceComposerChildType | false) => {
        if (resource && isAdminResourceElement(resource)) {
          const { admin } = resource.props

          return mountElement(permissions, admin?.permissions, resource) || ForbiddenResource
        }
        return resource
      })}
    </>
  )
}
