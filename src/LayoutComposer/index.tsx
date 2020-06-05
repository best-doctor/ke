import * as React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { RenderDetail } from './RenderDetail'
import { RenderList } from './RenderList'

export const LayoutComposer = (props: any): JSX.Element => {
  const { customAdminClass, additionalDetailComponents, provider } = props

  return (
    <Router>
      <Switch>
        <Route exact path="/appeals/">
          <RenderList admin={customAdminClass} provider={provider} />
        </Route>
        <Route exact path="/appeals/:id">
          <RenderDetail
            admin={customAdminClass}
            additionalComponents={additionalDetailComponents}
            provider={provider}
          />
        </Route>
      </Switch>
    </Router>
  )
}
