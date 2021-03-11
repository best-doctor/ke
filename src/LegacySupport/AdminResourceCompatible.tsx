import React, { PropsWithChildren } from 'react'
import { Route, Switch } from 'react-router-dom'

export function AdminResourceCompatible({ path, children }: AdminResourceCompatibleProps): JSX.Element {
  return (
    <Switch>
      <Route exact strict path={path}>
        {children}
      </Route>
    </Switch>
  )
}

type AdminResourceCompatibleProps = PropsWithChildren<{
  path: string
  navTitle: string
}>
