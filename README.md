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

In admin class you can describe:

* `baseUrl: string` – resource for API interaction
* [Fields for list view](https://github.com/best-doctor/ke/blob/master/docs/admin_fields/list_view.md)
* [Fields for detail view](https://github.com/best-doctor/ke/blob/master/docs/admin_fields/detail_view.md)
* [Filters for list view](https://github.com/best-doctor/ke/blob/master/docs/admin_fields/list_filters.md)

As a result, your admin class will look like this:

```tsx
// admin.tsx

import {
  BaseAdmin,
  BaseFilter,
  LinkWidget,
  TextWidget,
  SelectWidget,
  ForeignKeySelectWidget,
} from '@bestdoctor/ke';
import { PatientProvider } from './providers';

class PatientAdmin extends BaseAdmin {
  baseUrl = `${process.env.API_URL}patients/`

  list_filters = {
    name: 'id',
    label: 'ID',
    Filter: BaseFilter,
  }

  list_fields = [
    {
      id: 'id',
      Header: 'ID',
      toDetailRoute: '/patients',
      accessor: (row: any) => row.id,
    },
  ]

  detail_fields = [
    {
      name: 'full_name',
      widget: LinkWidget,
      helpText: 'Full name',
      href: (object: any) => object.admin.url,
      layout: { x: 2, y: 1, w: 2, h: 1, static: true },
    },
    {
      name: 'user.email',
      widget: TextWidget,
      helpText: 'User email',
      layout: {x: 0, y: 0, w: 1, h: 2, static: true},
    },
    {
      name: 'status',
      widget: SelectWidget,
      helpText: 'Status',
      dataSource: `${process.env.API_URL}appeal_results/`,
      layout: {x: 3, y: 3, w: 1, h: 2, static: true},
    },
    {
      name: 'user',
      widget: ForeignKeySelectWidget,
      helpText: 'User select',
      dataSource: `${process.env.API_URL}users/`,
      targetPayload: (object: any) => ({ user: object.email }),
      optionLabel: (object: any) => object.full_name,
      optionValue: (object: any) => object.email,
      layout: { x: 9, y: 13.5, w: 2, h: 1, static: true },
    }
  ]
}
```

To get more info about fields description,
check [here](https://github.com/best-doctor/ke/blob/master/docs/admin_fields)

After that you can use `ResourceComposer` and `Resource` components,
which makes all magic under the hood and get your user component.

`Resource` component takes the following arguments:

* `admin` – instance of your admin class
* `provider` – instance of your provider implementation

```tsx
import { ResourceComposer } from '@bestdoctor/ke';

import { Provider } from 'provider';

const provider = new Provider()

const App = () => (
  <ResourceComposer>
    <Resource
      name="patients"
      admin={new PatientAdmin()}
      provider={provider}
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
