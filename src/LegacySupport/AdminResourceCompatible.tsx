import React, { FC, useCallback } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ErrorBoundary } from '../common/components/ErrorBoundary'
import { MountObeserver } from './MountObeserver'

export interface AdminResourceCompatibleProps {
  path: string
  navTitle: string
  onMount?(navTitle: string): void
  onUnmount?(): void
}

export const AdminResourceCompatible: FC<AdminResourceCompatibleProps> = ({
  navTitle,
  path,
  children,
  onMount,
  onUnmount,
}) => {
  const handleMount = useCallback(() => {
    onMount?.(navTitle)
  }, [navTitle, onMount])

  return (
    <Switch>
      <Route exact strict path={path}>
        <Helmet>
          <title>{navTitle}</title>
        </Helmet>
        <ErrorBoundary>
          {children}
          <MountObeserver onMount={handleMount} onUnmount={onUnmount} />
        </ErrorBoundary>
      </Route>
    </Switch>
  )
}
