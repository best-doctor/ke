import React, { PropsWithChildren } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ErrorBoundary } from '../common/components/ErrorBoundary'

export function AdminResourceCompatible({ navTitle, path, children }: AdminResourceCompatibleProps): JSX.Element {
  return (
    <Switch>
      <Route exact strict path={path}>
        <Helmet>
          <title>{navTitle}</title>
        </Helmet>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Route>
    </Switch>
  )
}

type AdminResourceCompatibleProps = PropsWithChildren<{
  path: string
  navTitle: string
}>
