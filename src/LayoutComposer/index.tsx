import React from "react";
import { PatientAdmin } from "../admin/patient";
import RenderDetail from "./RenderDetail";
import RenderList from "./RenderList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const patientAdmin = new PatientAdmin();
const View = () => (
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
);

export default View;
