import React from "react";
import PatientAdmin from './PatientAdmin.sample'
import Render from './Render'

const View = () => <Render admin={new PatientAdmin()}/>

export default View;
