import * as React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { ThemeProvider, Flex } from '@chakra-ui/core'

import type { BaseAdmin } from 'admin'
import type { BaseProvider } from 'admin/providers'

import { RenderList } from './RenderList'
import { RenderDetail } from './RenderDetail'
import { SideBar } from '../components/SideBar'

const Resource = ({
  name,
  admin,
  provider,
}: {
  name: string
  admin: BaseAdmin
  provider: BaseProvider
}): JSX.Element => (
  <Switch>
    <Route exact path={`/${name}/`}>
      <RenderList admin={admin} provider={provider} />
    </Route>
    <Route exact path={`/${name}/:id`}>
      <RenderDetail name={name} admin={admin} provider={provider} />
    </Route>
  </Switch>
)

const ResourceComposer = ({ children }: { children: JSX.Element[] }): JSX.Element => {
  return (
    <ThemeProvider>
      <Flex>
        <SideBar resourceList={children} />
        <Router>{children}</Router>
      </Flex>
    </ThemeProvider>
  )
}

export { ResourceComposer, Resource }
