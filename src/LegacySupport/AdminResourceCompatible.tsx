import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ErrorBoundary } from '../common/components/ErrorBoundary'

export interface AdminResourceCompatibleProps {
  path: string
  navTitle: string
}

export const AdminResourceCompatible: FC<AdminResourceCompatibleProps> = ({ navTitle, path, children }) => (
  <Switch>
    <Route exact strict path={path}>
      <Helmet>
        <title>{navTitle}</title>
      </Helmet>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Route>
  </Switch>
)
