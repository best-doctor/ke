import { mountElement } from 'common/permissions'
import { TPathRules } from 'ListView/components/Breadcrumbs/Breadcrumbs'
import { SideBar } from 'ListView/components/SideBar'
import { SideBarElement } from 'ListView/components/SidebarElement'
import React, { FC } from 'react'
import { Redirect } from 'react-router-dom'
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
  children: ResourceComposerChildType | ResourceComposerChildType[]
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
      {React.Children.map(children, (resource: ResourceComposerChildType) => {
        if (isAdminResourceElement(resource)) {
          const { admin } = resource.props

          return mountElement(permissions, admin?.permissions, resource) || ForbiddenResource
        }
        return resource
      })}
    </>
  )
}
