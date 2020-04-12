import * as React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import type { BaseAdmin } from 'admin'
import type { FieldDescription } from 'admin/fields/FieldDescription'

type FieldComponentProps = {
  field: FieldDescription
  value: string | number
}

const FieldRender: React.FC<FieldComponentProps> = ({ field, value }) => (
  <li>
    {field.name}: {value}
  </li>
)

export const RenderDetail: React.FC<{ admin: BaseAdmin }> = ({ admin }) => {
  const [object, setObject] = useState<Model>()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    admin.provider.getObject(id).then((res) => setObject(res))
  }, [admin.provider, id])

  return (
    <div>
      {object ? (
        <ul>
          {admin.detail_fields.map((field) => (
            <FieldRender key={field.name} field={field} value={object[field.name]} />
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  )
}
