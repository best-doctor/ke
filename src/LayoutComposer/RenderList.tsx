import React, { FunctionComponent } from "react";
import { BaseAdmin } from "../admin/typings";

const LineRender: FunctionComponent<{ object: any }> = ({ object }) => (
  <li>This is some object</li>
);

const RenderList: FunctionComponent<{ admin: BaseAdmin }> = ({ admin }) => {
  const objects: any[] = [];
  return (
    <div>
      <ul>
        {objects.map((object, index) => (
          <LineRender key={index} object={object} />
        ))}
      </ul>
    </div>
  );
};

export default RenderList;
