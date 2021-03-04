import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

export function AdminResourceCompatible({ path, component: Component }: AdminResourceCompatibleProps): JSX.Element {
  return (
    <Switch>
      <Route exact strict path={path}>
        <Component />
      </Route>
    </Switch>
  )
}

interface AdminResourceCompatibleProps {
  path: string
  navTitle: string
  component: FC
}
