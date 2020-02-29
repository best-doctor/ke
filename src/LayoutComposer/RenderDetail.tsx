import React, { FunctionComponent } from "react";
import { BaseAdmin, FieldDescription } from "../admin/typings";

const FieldRender: FunctionComponent<{ field: FieldDescription }> = ({ field }) => (
  <li>{field.name}: some dummy value</li>
);

const RenderDetail: FunctionComponent<{ admin: BaseAdmin }> = ({ admin }) => (
  <div>
    <ul>
      {admin.fields.map((field, index) => (
        <FieldRender key={index} field={field} />
      ))}
    </ul>
  </div>
);

export default RenderDetail;
