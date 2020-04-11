import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { PatientAdmin } from 'examples/patients/admin'
import { RenderDetail } from './RenderDetail'
import { RenderList } from './RenderList'

const patientAdmin = new PatientAdmin()
export const LayoutComposer = (): JSX.Element => (
  <Router>
    <Switch>
      <Route exact path="/patients">
        <RenderList admin={patientAdmin} />
      </Route>
      <Route exact path="/patients/:id">
        <RenderDetail admin={patientAdmin} />
      </Route>
    </Switch>
  </Router>
)
