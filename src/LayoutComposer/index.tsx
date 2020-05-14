import * as React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { RenderDetail } from './RenderDetail'
import { RenderList } from './RenderList'

export const LayoutComposer = (props: any): JSX.Element => {
  const { customAdminClass, additionalComponents } = props

  return (
    <Router>
      <Switch>
        <Route exact path="/appeals">
          <RenderList admin={customAdminClass} />
        </Route>
        <Route exact path="/appeals/:id">
          <RenderDetail admin={customAdminClass} additionalComponents={additionalComponents} />
        </Route>
      </Switch>
    </Router>
  )
}
