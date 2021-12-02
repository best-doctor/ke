import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ErrorBoundary } from '../common/components/ErrorBoundary'

interface ResourceProps {
  name: string
}

export const Resource: FC<ResourceProps> = ({ name, children }) => (
  <Switch>
    <Route exact path={`/${name}/`}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Route>
  </Switch>
)
