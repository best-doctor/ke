import React, { PropsWithChildren } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ErrorBoundary } from '../common/components/ErrorBoundary'

export function AdminResourceCompatible({ path, children }: AdminResourceCompatibleProps): JSX.Element {
  return (
    <Switch>
      <Route exact strict path={path}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Route>
    </Switch>
  )
}

type AdminResourceCompatibleProps = PropsWithChildren<{
  path: string
  navTitle: string
}>
