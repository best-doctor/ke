import React, { FunctionComponent } from "react";
import { BaseAdmin } from "../admin/typings";

const Render: FunctionComponent<{ admin: BaseAdmin }> = ({ admin }) => (
  <div>
    <ul>
      {admin.fields.map((field, index) => (
        <li key={index}>{field.name}: some dummy value</li>
      ))}
    </ul>
  </div>
);

export default Render;
