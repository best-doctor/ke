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
It implements the basic methods for HTTP interaction using an axios instance.
Thus, you should have an axios instance with the required headers and pass
it to the provider class.

```ts
// client.ts

const httpClient = axios.create({
  baseURL: process.env.API_URL,
})

// provider.ts

import { BaseProvider } from '@bestdoctor/ke';
import { httpClient } from 'client';

class PatientProvider extends BaseProvider {
  constructor() {
    super(httpClient)
  }
}

```

After that you should extend BaseAdmin class.
Here you can declaratively describe your component.

```tsx
// admin.tsx

import { BaseAdmin } from '@bestdoctor/ke';
import { Link, Text } from 'custom-ui-ket';
import { PatientProvider } from './providers';

class PatientAdmin extends BaseAdmin {
  baseUrl = `${process.env.API_URL}patients/`

  list_fields = [
    {
      id: 'id',
      Header: 'ID',
      toDetailRoute: '/patients',
      accessor: (row: any) => row.id,
      filterName: 'id',
      filterOperation
      Filter: BaseFilter,
    },
  ]

  detail_fields = [
    {
      name: 'full_name',
      widget: Link,
      widget_attrs: { color: 'teal.500' },
      layout: { x: 2, y: 1, w: 2, h: 1, static: true },
    },
    {
      name: 'user__email',
      widget: Text,
      layout: {x: 0, y: 0, w: 1, h: 2, static: true}
    },
  ]
}
```

BaseAdmin class uses attributes to build custom component:

* `baseUrl` - admin class resource
* `list_fields` - settings for displaying a list view table with specific
  field styles. It uses [react-table](https://github.com/tannerlinsley/react-table)
  under the hood.
* `detail_fields` - settings for displaying a detail page view with specific
  field styles

Attributes in list fields description:

It uses react-table settings format with some additions. For example:

* `toDetailRoute` – (optional) tells the table to use this column as
  detail route with a given url
* `filterName` – (optional) name to generate server side filtering request.
  With `id` value it will generate `/api/patients/?id=100500`
* filterOperation – (optional) filter operation for server side filtering.
  With `filterName = date` and `filterOperation = 'gte'`
  it will generate `/api/patients/?date__gte=20.01.20`
* Filter – (optional) filter widget. It uses react-table formatunder the hood

Attributes in detail fields description:

* `name` - field title in json response from backend
* `widget` - React Component for rendering data in user interface
* `widget_attrs` – (optional) custom props for widget
* `layout` - setting for the grid to display the widget in the user interface

After that you can use `ResourceComposer` and `Resource` components,
which makes all magic under the hood and get your user component.

`Resource` component takes the following arguments:

* `admin` – instance of your admin class
* `provider` – instance of your provider implementation
* `additionalDetailComponents` – (optional) you can pass in ke your
  custom components which it will render

```ts
import { ResourceComposer } from '@bestdoctor/ke';

import { Provider } from 'provider';

const provider = new Provider()

const App = () => (
  <ResourceComposer>
    <Resource
      name="patients"
      admin={new PatientAdmin()}
      provider={provider}
      additionalDetailComponents={[]}
    />
  </ResourceComposer>
)
```

`App` will have routes for the list and detail view with the
settings and widgets you set.

## Contributing

We would love you to contribute to our project. It's simple:

* Create an issue with bug you found or proposal you have.
  Wait for approve from maintainer.
* Create a pull request. Make sure all checks are green.
* Fix review comments if any.
* Be awesome.

### Installation for local development

After cloning this repo if you'd like to use it in another project using React
(placed at e.g. `/path/to/your/awesome/project/`) you should follow these steps:

* install all deps: `yarn install`
* create link to `@bestdoctor/ke`: `yarn link`
* link existing React in order to prevent hooks
  [problem](https://ru.reactjs.org/warnings/invalid-hook-call-warning.html):
  `npm link /path/to/your/awesome/project/node_modules/react`
* link `@bestdoctor/ke` to your project:
  `yarn link "@bestdoctor/ke"` (must be run in your project's folder)

Here are useful tips:

* You can run all checks and tests with `yarn makecheck`.
  Please do it before TravisCI does.
* We respect [Django CoC](https://www.djangoproject.com/conduct/).
  Make soft, not bullshit.
