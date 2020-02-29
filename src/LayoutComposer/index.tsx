import React from "react";
import { PatientAdmin } from "../admin/patient";
import Render from "./Render";

const View = () => <Render admin={new PatientAdmin()} />;

export default View;
