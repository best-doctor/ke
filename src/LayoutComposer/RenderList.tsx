import React, { FunctionComponent, useEffect, useState } from "react";
import { BaseAdmin } from "../admin/typings";
import Table from "react-bootstrap/Table";

const LineRender: FunctionComponent<{ fieldNames: string[]; object: any }> = ({
  object,
  fieldNames
}) => (
  <tr>
    {fieldNames.map((fName, index) => (
      <td key={index}>{object[fName]}</td>
    ))}
  </tr>
);

const RenderList: FunctionComponent<{ admin: BaseAdmin }> = ({ admin }) => {
  const [objects, setObjects] = useState<Object[]>([]);

  useEffect(() => {
    admin.provider.getList().then(setObjects);
  }, []);

  const fields = admin.fields.map(field => field.name);

  return (
    <Table>
      <thead>
        <tr>
          {fields.map((fName, index) => (
            <th key={index}>{fName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {objects.map((object, index) => (
          <LineRender key={index} object={object} fieldNames={fields} />
        ))}
      </tbody>
    </Table>
  );
};

export default RenderList;
