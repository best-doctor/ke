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

`AdminResource` component takes the following arguments:

* `admin` – instance of your admin class
* `provider` – instance of your provider implementation

```tsx
import { ResourceComposer } from '@bestdoctor/ke';

import { Provider } from 'provider';

const provider = new Provider()

const App = () => (
  <ResourceComposer>
    <AdminResource
      name="patients"
      admin={new PatientAdmin()}
      provider={provider}
    />
  </ResourceComposer>
)
```

`App` will have routes for the list and detail view with the
settings and widgets you set.

## Permissions

You can restrict access to different sections of your system,
as well as to individual widgets.

To restrict access to an entire section, define permissions list
in your admin class:

```tsx
import { BaseAdmin } from '@bestdoctor/ke'

class MyAdmin extends BaseAdmin {
  baseUrl = 'https://test.com'

  permissions = ['my_admin_access_permission']

  list_fields = ...
}
```

and pass current user permissions list to `ResourceComposer` element:

```tsx
<ResourceComposer permissions={currentUser.permissions}>
  ...
</ResourceComposer>
```

To render a specific widget based on user permissions, use `hasPermission`
util in detail fields settings:

```tsx
import { hasPermission } from '@bestdoctor/ke'

...
{
  name: 'status.text',
  helpText: 'Status',
  widget: (user: { permissions: string[] }) => (
    hasPermission(user.permissions, 'admin_permission') ? SelectWidget : TextWidget
  ),
  displayValue: (object: any) => object.status,
  targetPayload: (value: any) => ({ status: value }),
  layout: { x: 9, y: 9, w: 2, h: 1, static: true },
},
```

## Monitoring

Out of the box we support error monitoring via [Sentry](https://sentry.io)
To include it in your application, use the component [`EnableSentry`](https://github.com/best-doctor/ke/blob/master/src/integration/EnableSentry.tsx)
at the root of your application.

```tsx
// App.tsx
import { EnableSentry } from '@bestdoctor/ke'

const App = (): JSX.Element => (
  <>
    <EnableSentry sentryDSN={sentryDSN} />
    <h1>Hello, world</h1>
  </>
)
```

For application perfomance monitoring we support [ELK APM](https://www.elastic.co/apm)
You can use it via [EnableELK](https://github.com/best-doctor/ke/blob/master/src/integration/EnableELK.tsx)
component

```tsx
import { EnableELK } from '@bestdoctor/ke'

const App = (): JSX.Element => (
  <>
    <EnableELK
      serviceName={ELK_SERVICE_NAME}
      serverUrl={ELK_SERVER_URL}
      serviceVersion={ELK_SERVICE_VERSION}
    />
    <h1>Hello, world</h1>
  </>
)
```

## Analytics

`ke` has default integration with google analytics through firebase.
You can use it or connect the service you need. To use build-in analytics
create instance:

```ts
import { FirebaseAnalytics } from '@bestdoctor/ke'

const firebaseConfig = {
    apiKey: 'secret',
    authDomain: 'auth.domain',
    databaseURL: 'database.url',
    projectId: 'projectID',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
    userId: '',
  }

const analytics = new FirebaseAnalytics(firebaseConfig)
```

and pass it to your `AdminResource`:

```tsx
<AdminResource
  name="test"
  admin={new TestAdmin()}
  provider={provider}
  user={currentUser}
  analytics={analytics}
/>
```

If you want to use another analytics service,
you must define on your side a client that
will implement the base [interface](https://github.com/best-doctor/ke/blob/master/src/integration/analytics/base.ts),
by analogy with [firebase](https://github.com/best-doctor/ke/blob/master/src/integration/analytics/firebase/firebase.ts)

Analytics hanlder here is object,
that will handle events submit (in case you use SDK).

`ke` has default analytics payload format:

```
eventName: string – name of event. By default defined [here](https://github.com/best-doctor/ke/blob/master/src/integration/analytics/firebase/enums.ts)

widgetName: string – name of widget that triggered event

widgetType: string – type of widget that triggered event. By default defined
[here](https://github.com/best-doctor/ke/blob/master/src/integration/analytics/firebase/enums.ts)

value: string | object – value to send with event

viewType: string – current view type (list or detail)

resourceName: string – name of the backend resource on which the event occurred

resourceId: string – id of the backend resource on which the event occurred
(in case of detail view)

url: string – current location in SPA routing
```

You can override it with `widgetAnalytics` setting
in your [admin class settings](https://github.com/best-doctor/ke#usage-example)
(place where you describe your widgets layout).

This setting can be declared as an arrow function that takes all of the above parameters.
The return value of this function will be used as
the body of the request when sent to the analytics:

```ts
{
  name: 'test_widget',
  widget: SelectWidget,
  widgetAnalytics: ({ eventName, viewType, value, widgetName }) => (
    { customEventKey: { eventName, ... }}
  ),
  ...
}
```

To disable analytics for a specific widget, you can declare a `widgetAnalytics`
setting as `false`:

```ts
{
  name: 'test_widget',
  widget: SelectWidget,
  widgetAnalytics: false,
  ...
}
```

If you want to use analytics in your custom component-based widget,
you can use `pushAnalytics` [handler](https://github.com/best-doctor/ke/blob/master/src/integration/analytics/utils.ts#L19)

It encapsulates the logic for unpacking and sending the event to the analytics.
Among other arguments described above, it takes `widgetAnalytics` parameter.

```ts
pushAnalytics({
  eventName: EventNameEnum.BUTTON_CLICK,
  widgetType: WidgetTypeEnum.ACTION,
  value: 'some value',
  widgetAnalytics: true,
  widgetName,
  viewType: 'some_action',
  resource: 'some_resource',
  ...props,
})
```

`props` here is the [properties](https://github.com/best-doctor/ke/blob/master/src/typing.tsx#L12),
that `ke` injects in your custom widget when renders them from admin settings.

```tsx
import type { WidgetProps } from '@bestdoctor/ke'

const CustomWidget = (props: WidgetProps): JSX.Element => {
  const handleUserAction = (): void => {
    pushAnalytics({
      eventName: EventNameEnum.BUTTON_CLICK,
      widgetType: WidgetTypeEnum.ACTION,
      value: 'some value',
      widgetAnalytics: true,
      widgetName,
      viewType: 'some_action',
      resource: 'some_resource',
      ...props,
    })

    ...
  }

  return (
    <Button onClick={handleUserAction}>TEST</Button>
  )
}
```

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
