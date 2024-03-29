import React, { FC } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ErrorBoundary } from '../common/components/ErrorBoundary'
import { RenderList } from '../ListView/RenderList'
import { RenderDetail } from '../DetailView/RenderDetail'
import { BaseAdmin } from '../admin'
import type { Provider } from '../admin/providers/interfaces'
import { BaseNotifier } from '../common/notifier'
import { BaseAnalytic } from '../integration/analytics/base'
import { getAccessor } from '../DetailView/utils/dataAccess'

export interface AdminResourceProps {
  name: string
  admin: BaseAdmin
  provider: Provider
  user: object
  analytics?: BaseAnalytic
  notifier?: BaseNotifier
}

export const AdminResource: FC<AdminResourceProps> = ({ name, admin, provider, user, analytics, notifier }) => (
  <Switch>
    <Redirect exact strict from={`/${name}`} to={`/${name}/`} />
    {!getAccessor(admin.hideListView) && (
      <Route exact strict path={`/${name}/`}>
        <ErrorBoundary>
          <RenderList resourceName={name} admin={admin} provider={provider} user={user} analytics={analytics} />
        </ErrorBoundary>
      </Route>
    )}
    <Route exact path={`/${name}/:id`}>
      <ErrorBoundary>
        <RenderDetail
          resourceName={name}
          admin={admin}
          provider={provider}
          user={user}
          analytics={analytics}
          notifier={notifier}
        />
      </ErrorBoundary>
    </Route>
  </Switch>
)
