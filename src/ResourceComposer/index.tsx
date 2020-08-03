import * as React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { ThemeProvider } from '@chakra-ui/core'

import type { BaseAdmin } from 'admin'
import type { BaseProvider } from 'admin/providers'
import type { BaseAnalytic } from 'integration/analytics/base'

import { RenderList } from './RenderList'
import { RenderDetail } from './RenderDetail'
import { SideBar, SideBarElement } from '../components/SideBar'
import { mountElement } from '../utils/permissions'

const Resource = ({
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
}): JSX.Element => {
  return (
    <Switch>
      <Route exact path={`/${name}/`}>
        <RenderList admin={admin} provider={provider} user={user} analytics={analytics} />
      </Route>
      <Route exact path={`/${name}/:id`}>
        <RenderDetail resourceName={name} admin={admin} provider={provider} user={user} analytics={analytics} />
      </Route>
    </Switch>
  )
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
    <ThemeProvider>
      {withSideBar && (
        <SideBar header="Разделы">
          {React.Children.map(children, (resource: any) => {
            const adminPermissions = resource.props.admin.permissions
            const element = <SideBarElement resource={resource} />

            return mountElement(permissions, adminPermissions, element) || <></>
          })}
        </SideBar>
      )}
      <Router>
        {React.Children.map(children, (resource: any) => {
          const adminPermissions = resource.props.admin.permissions

          return mountElement(permissions, adminPermissions, resource) || forbiddenResourceElement
        })}
      </Router>
    </ThemeProvider>
  )
}

export { ResourceComposer, Resource }
