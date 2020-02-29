import React, { FunctionComponent, useState, useEffect } from "react";
import { BaseAdmin, FieldDescription } from "../admin/typings";

const FieldRender: FunctionComponent<{ field: FieldDescription }> = ({
  field
}) => <li>{field.name}: some dummy value</li>;

const RenderDetail: FunctionComponent<{ admin: BaseAdmin, objectID: string }> = ({ admin, objectID }) => {
  const [object, setObject] = useState<Object>();

  useEffect(() => setObject(admin.provider.getObject(objectID)))

  return (
    <div>
      <ul>
        {admin.fields.map((field, index) => (
          <FieldRender key={index} field={field} />
        ))}
      </ul>
    </div>
  );
};

export default RenderDetail;
