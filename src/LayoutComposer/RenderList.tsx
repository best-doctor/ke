import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import type BaseAdmin from 'admin/typings'

const LineRender: FunctionComponent<{ fieldNames: string[]; object: Model }> = ({ object, fieldNames }) => {
  const fieldWidget = (fName: string) => {
    let component = null
    const value = object[fName]
    switch (fName) {
      case 'id':
        component = <Link to={`/patients/${value}`}>{value}</Link>
        break
      default:
        component = value
    }
    return component
  }

  return (
    <tr>
      {fieldNames.map(fName => (
        <td key={fName}>{fieldWidget(fName)}</td>
      ))}
    </tr>
  )
}

const RenderList: FunctionComponent<{ admin: BaseAdmin }> = ({ admin }) => {
  const [objects, setObjects] = useState<Model[]>([])

  useEffect(() => {
    admin.provider.getList().then(setObjects)
  }, [admin.provider])

  const fields = ['id', ...admin.fields.map(field => field.name)]

  return (
    <table>
      <thead>
        <tr>
          {fields.map(fName => (
            <th key={fName}>{fName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {objects.map(object => (
          <LineRender key={object.id} fieldNames={fields} object={object} />
        ))}
      </tbody>
    </table>
  )
}

export default RenderList
