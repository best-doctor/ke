import React, { FunctionComponent, useEffect, useState } from "react";
import { BaseAdmin } from "../admin/typings";
import Table from "react-bootstrap/Table";

const LineRender: FunctionComponent<{ object: any }> = ({ object }) => (
  <tr>
    <td>This is some object</td>
  </tr>
);

const RenderList: FunctionComponent<{ admin: BaseAdmin }> = ({ admin }) => {
  const [objects, setObjects] = useState<Object[]>([]);
  
  useEffect(() => setObjects(admin.provider.getList()));

  return (
    <Table>
      <thead></thead>
      <tbody>
        {objects.map((object, index) => (
          <LineRender key={index} object={object} />
        ))}
      </tbody>
    </Table>
  );
};

export default RenderList;
