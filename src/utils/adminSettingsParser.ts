import type { BaseAdmin } from 'admin'
import type { adminSettings } from 'typing'

const getNestedData = (fieldPath: Array<string>, data: any): any => {
  let dataToUnpack = data

  fieldPath.forEach((path) => {
    dataToUnpack = dataToUnpack[path]
  })

  return dataToUnpack
}

const parseAdminSettings = (admin: BaseAdmin, data: any): adminSettings => {
  const parsedSettings: adminSettings = []
  const listFields = admin.list_fields

  listFields.forEach((element) => {
    const relatedFieldSeparator = '__'

    const fieldPath = element.name.split(relatedFieldSeparator)
    let fieldData: any = null

    if (fieldPath.length > 1) {
      fieldData = getNestedData(fieldPath, data)
    } else {
      const path = fieldPath[0]
      fieldData = data[path]
    }

    parsedSettings.push({
      name: element.name,
      flat_data: fieldData,
      widget: element.widget,
      layout_data: element.layout,
    })
  })

  return parsedSettings
}

export { parseAdminSettings }
