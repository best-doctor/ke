import React, { FunctionComponent, useState, useEffect } from "react";
import { BaseAdmin, FieldDescription } from "../admin/typings";
import { useParams } from "react-router";

const FieldRender: FunctionComponent<{ field: FieldDescription }> = ({
  field
}) => <li>{field.name}: some dummy value</li>;

const RenderDetail: FunctionComponent<{ admin: BaseAdmin }> = ({ admin }) => {
  const [object, setObject] = useState<Object>();
  const objectId = useParams<{ id: string }>();
  // useEffect(() => setObject(admin.provider.getObject(objectID)))

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
