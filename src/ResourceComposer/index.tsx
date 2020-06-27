import * as React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { ThemeProvider } from '@chakra-ui/core'

import type { BaseAdmin } from 'admin'
import type { BaseProvider } from 'admin/providers'

import { RenderList } from './RenderList'
import { RenderDetail } from './RenderDetail'

const Resource = ({
  name,
  admin,
  provider,
  additionalDetailComponents,
}: {
  name: string
  admin: BaseAdmin
  provider: BaseProvider
  additionalDetailComponents: JSX.Element[]
}): JSX.Element => (
  <Switch>
    <Route exact path={`/${name}/`}>
      <RenderList admin={admin} provider={provider} />
    </Route>
    <Route exact path={`/${name}/:id`}>
      <RenderDetail name={name} admin={admin} additionalComponents={additionalDetailComponents} provider={provider} />
    </Route>
  </Switch>
)

const ResourceComposer = ({ children }: { children: JSX.Element[] }): JSX.Element => {
  return (
    <ThemeProvider>
      <Router>{children}</Router>
    </ThemeProvider>
  )
}

export { ResourceComposer, Resource }
