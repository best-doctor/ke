import { ErrorBoundary } from 'common/components/ErrorBoundary'
import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

interface IResourceProps {
  name: string
}

export const Resource: FC<IResourceProps> = ({ name, children }) => (
  <Switch>
    <Route exact path={`/${name}/`}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Route>
  </Switch>
)
