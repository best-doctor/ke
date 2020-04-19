import type { adminSettings } from 'typing'
import type { DetailFieldDescription } from 'admin/fields/FieldDescription'

const getNestedData = (fieldPath: Array<string>, data: any): any => {
  let dataToUnpack = data

  fieldPath.forEach((path) => {
    dataToUnpack = dataToUnpack[path]
  })

  return dataToUnpack
}

const parseAdminSettings = (adminFields: DetailFieldDescription[], data: any): adminSettings => {
  const parsedSettings: adminSettings = []
  const relatedFieldSeparator = '__'

  adminFields.forEach((element) => {
    const fieldPath = element.name.split(relatedFieldSeparator)
    let fieldData: any = null

    if (fieldPath.length > 1) {
      fieldData = getNestedData(fieldPath, data)
    } else {
      const path = fieldPath[0]
      fieldData = data[path]
    }

    parsedSettings.push({
      name: data.id + element.name,
      flat_data: fieldData,
      widget: element.widget,
      widget_attrs: element.widget_attrs,
      layout_data: element.layout,
    })
  })

  return parsedSettings
}

export { parseAdminSettings }
