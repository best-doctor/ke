import type { Component } from 'react';
import type { BaseAdmin } from 'admin';
import type { LayoutData } from '../typing';

type adminSettingsElement = {
	flat_data: string,
	widget: Component,
	layout_data: LayoutData,
}

type adminSettings = Array<adminSettingsElement>

const getNestedData = (fieldPath: Array<string>, data: any): any => {
  let dataToUnpack = data;

  fieldPath.forEach((path) => {
    dataToUnpack = dataToUnpack[path];
  })

  return data
}

const parseAdminSettings = (admin: BaseAdmin, data: any): adminSettings => {
  const parsedSettings: adminSettings = []
  const listFields = admin.list_fields;

  listFields.forEach(element => {
    const relatedFieldSeparator = '__';

    const fieldPath = element.name.split(relatedFieldSeparator);
    let fieldData: any = null;

    if (fieldPath.length > 1) {
        fieldData = getNestedData(fieldPath, data);
    } else {
        const path = fieldPath[0]
        fieldData = data[path];
    }

    parsedSettings.push({
      flat_data: fieldData,
      widget: element.widget,
      layout_data: element.layout,
    })
  });

  return parsedSettings;
}

export {parseAdminSettings};
