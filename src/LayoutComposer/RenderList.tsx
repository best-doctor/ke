import React, { FunctionComponent, useEffect, useState } from "react";
import { BaseAdmin } from "../admin/typings";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const LineRender: FunctionComponent<{ fieldNames: string[]; object: any }> = ({
  object,
  fieldNames
}) => {
  const fieldWidget = (fName: string) => {
    const element =
      fName === "id" ? <Link to={object.id}>{object.id.toString()}</Link> : object[fName];
    return element;
  };
  return (
    <tr>
      {fieldNames.map((fName, index) => (
        <td key={index}>{fieldWidget(fName)}</td>
      ))}
    </tr>
  );
};

const RenderList: FunctionComponent<{ admin: BaseAdmin }> = ({ admin }) => {
  const [objects, setObjects] = useState<any[]>([]);

  useEffect(() => {
    admin.provider.getList().then(setObjects);
  }, []);

  const fields = ["id", ...admin.fields.map(field => field.name)];

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
        {objects.map(object => (
          <LineRender key={object.id} object={object} fieldNames={fields} />
        ))}
      </tbody>
    </Table>
  );
};

export default RenderList;
