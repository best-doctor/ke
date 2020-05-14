# ke

[![Build Status](https://travis-ci.org/best-doctor/ke.svg?branch=master)](https://travis-ci.org/best-doctor/ke)
[![Maintainability](https://api.codeclimate.com/v1/badges/ab2c95e8362410f4f079/maintainability)](https://codeclimate.com/github/best-doctor/ke/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ab2c95e8362410f4f079/test_coverage)](https://codeclimate.com/github/best-doctor/ke/test_coverage)

React admin framework done by and for backenders

ALPHA VERSION – NOT FOR PRODUCTION USE

## Installation

`$ yarn add @bestdoctor/ke`

## Usage example

This is an example of the future API

To use `ke` you should implement several base classes.

First of all you should extend `BaseProvider` class.
It uses the `url` attribute, which determines the required resource, to
fetch data from your backend.

```ts
// providers.ts

import { BaseProvider } from '@bestdoctor/ke';

class PatientProvider extends BaseProvider {
  url = '/patients/'
}

```

After that you should extend BaseAdmin class.
Here you can declaratively describe your component.

```ts
// admin.ts

import {
  BaseAdmin, LinkField, TableRowWidget,
  StringField, SelectWidget, NestedStructure, InfoWidget,
} from '@bestdoctor/ke';
import { PatientProvider } from './providers';

class PatientAdmin extends BaseAdmin {
  provider = new PatientProvider()

  list_fields = [
    {
      name: 'id',
      fieldType: LinkField,
      widget: TableRowWidget,
      className: 'tableRowElement',
      layout: {x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    },
  ]

  detail_fields = [
    {
      name: 'full_name',
      fieldType: StringField,
      widget: SelectWidget,
      className: 'patientFirstName',
      layout: {x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    },
    {
      name: 'user__email',
      fieldType: NestedStructure,
      widget: InfoWidget,
      className: 'userEmail',
      layout: {x: 0, y: 0, w: 1, h: 2, static: true}
    },
  ]
}
```

BaseAdmin class uses attributes to build custom component:

* `provider` - for fetching data from backend
* `list_fields` - settings for displaying a list view table with specific
  field styles
* `detail_fields` - settings for displaying a detail page view with specific
  field styles

Attributes in fields description:

* `name` - field title in json response from backend
* `fieldType` - field type definition for deserializing data from backend
* `widget` - React Component for rendering data in user interface
* `className` - CSS style title
* `layout` - setting for the grid to display the widget in the user interface

After that you can use component `LayoutComposer`, which makes all magic under
the hood and get your user component.

```ts
import { LayoutComponent } from '@bestdoctor/ke';

const PatientComponent = () => <LayoutComposer data={new PatientAdmin()}/>
```

`PatientComponent` will have routes for the list and detail view with the
settings and widgets you set.

## Contributing

We would love you to contribute to our project. It's simple:

* Create an issue with bug you found or proposal you have.
  Wait for approve from maintainer.
* Create a pull request. Make sure all checks are green.
* Fix review comments if any.
* Be awesome.

Here are useful tips:

* You can run all checks and tests with `yarn makecheck`.
  Please do it before TravisCI does.
* We respect [Django CoC](https://www.djangoproject.com/conduct/).
  Make soft, not bullshit.
