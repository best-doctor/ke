import * as React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { RenderDetail } from './RenderDetail'
import { RenderList } from './RenderList'

export const LayoutComposer = (props: any): JSX.Element => {
  const { customAdminClass } = props

  return (
    <Router>
      <Switch>
        <Route exact path="/patients">
          <RenderList admin={customAdminClass} />
        </Route>
        <Route exact path="/patients/:id">
          <RenderDetail admin={customAdminClass} />
        </Route>
      </Switch>
    </Router>
  )
}
