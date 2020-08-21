import * as React from 'react'
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { ThemeProvider } from '@chakra-ui/core'

import type { BaseAdmin } from 'admin'
import type { BaseProvider } from 'admin/providers'
import type { BaseAnalytic } from 'integration/analytics/base'

import { RenderList } from './RenderList'
import { RenderDetail } from '../DetailView/RenderDetail'
import { SideBar, SideBarElement } from '../components/SideBar'
import { mountElement } from '../utils/permissions'

const Resource = ({ name, children }: { name: string; children: JSX.Element }): JSX.Element => {
  return (
    <Switch>
      <Route exact path={`/${name}/`}>
        {children}
      </Route>
    </Switch>
  )
}

const AdminResource = ({
  name,
  admin,
  provider,
  user,
  analytics,
}: {
  name: string
  admin: BaseAdmin
  provider: BaseProvider
  user: any
  analytics: BaseAnalytic | undefined
}): JSX.Element => (
  <Switch>
    <Redirect exact strict from={`/${name}`} to={`/${name}/`} />
    <Route exact strict path={`/${name}/`}>
      <RenderList resourceName={name} admin={admin} provider={provider} user={user} analytics={analytics} />
    </Route>
    <Route exact path={`/${name}/:id`}>
      <RenderDetail resourceName={name} admin={admin} provider={provider} user={user} analytics={analytics} />
    </Route>
  </Switch>
)

const isAdminResource = (resource: any): boolean => {
  return resource.props.admin !== undefined
}

const ResourceComposer = ({
  children,
  withSideBar = true,
  permissions = [],
}: {
  permissions: string[]
  withSideBar: boolean
  children: JSX.Element[]
}): JSX.Element => {
  const forbiddenResourceElement = <p>Простите, вам сюда нельзя :(</p>
  return (
    <Router>
      <ThemeProvider>
        {withSideBar && (
          <SideBar header="Разделы">
            {React.Children.map(children, (resource: any) => {
              if (isAdminResource(resource)) {
                const adminPermissions = resource.props.admin.permissions
                const element = <SideBarElement resource={resource} />

                return mountElement(permissions, adminPermissions, element) || <></>
              }
              return <></>
            })}
          </SideBar>
        )}
        {React.Children.map(children, (resource: any) => {
          if (isAdminResource(resource)) {
            const adminPermissions = resource.props.admin.permissions

            return mountElement(permissions, adminPermissions, resource) || forbiddenResourceElement
          }
          return resource
        })}
      </ThemeProvider>
    </Router>
  )
}

export { ResourceComposer, Resource, AdminResource }
