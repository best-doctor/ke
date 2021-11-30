import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ErrorBoundary } from '../common/components/ErrorBoundary'

export interface ICompatibleAdminResourceProps {
  path: string
  navTitle: string
}

export const AdminResourceCompatible: FC<ICompatibleAdminResourceProps> = ({ navTitle, path, children }) => (
  <Switch>
    <Route exact strict path={path}>
      <Helmet>
        <title>{navTitle}</title>
      </Helmet>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Route>
  </Switch>
)
