import React, { FunctionComponent, useState, useEffect } from "react";
import { BaseAdmin, FieldDescription } from "../admin/typings";
import { useParams } from "react-router";

const FieldRender: FunctionComponent<{
  field: FieldDescription;
  value: any;
}> = ({ field, value }) => (
  <li>
    {field.name}: {value}
  </li>
);

const RenderDetail: FunctionComponent<{ admin: BaseAdmin }> = ({ admin }) => {
  const [object, setObject] = useState<any>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    admin.provider.getObject(id).then(res => setObject(res));
  }, []);

  return (
    <div>
      {object ? (
        <ul>
          {admin.fields.map((field, index) => (
            <FieldRender key={index} field={field} value={object[field.name]} />
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default RenderDetail;
