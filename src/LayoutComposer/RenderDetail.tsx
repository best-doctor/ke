import React, { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import BaseAdmin from '../admin/typings'
import FieldDescription from '../admin/typings/FieldDescription'

const FieldRender: FunctionComponent<{
  field: FieldDescription
  value: string | number
}> = ({ field, value }) => (
  <li>
    {field.name}: {value}
  </li>
)

const RenderDetail: FunctionComponent<{ admin: BaseAdmin }> = ({ admin }) => {
  const [object, setObject] = useState<Model>()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    admin.provider.getObject(id).then(res => setObject(res))
  }, [admin.provider, id])

  return (
    <div>
      {object ? (
        <ul>
          {admin.fields.map(field => (
            <FieldRender key={field.name} field={field} value={object[field.name]} />
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}

export default RenderDetail
