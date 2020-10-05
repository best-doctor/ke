# Detail view

To generate detail view for your admin resource, you should setup
`detail_fields` setting in your admin class.

`ke` has a set of predefined widgets, which can be used to build admin detail view.

`detail_fields` setting uses javascript objects syntax
and can contains the following properties:

* `name: string` – path to data in JSON response from your backend.

  You should use dot notation to define the path to payload and `ke`
  will get it via lodash [`get`](https://lodash.com/docs/4.17.15#get)

  This field is also used for the unique key of the element,
  so if your widget does not imply data unpacking, just put a unique title in the
  name field
* `widget: Component` – component to render an element on your detail view.

  `ke` has set of [predefined widgets](https://github.com/best-doctor/ke/tree/master/src/components)
  but you can implement your custom.

  While `ke` will mount widgets to page,
  it will try to pass all properties from detail field setting to your component.
  Also it will pass some additional props, like detail object from your backend,
  state setter, notifier and grid style props.
  So, you can unpack only those objects that your specific component needs via
  [js destructing syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
* `helpText?: string | undefined` – help text label for your widget
* `displayValue?: string | (obj: backendDetailObject) | undefined` – value to display.

  It can be a static value (string) or dynamically selected (arrow function).
  In the second case, the arrow function will accept as input an object received
  from the backend in your [DetailView](https://github.com/best-doctor/ke/blob/master/src/DetailView/RenderDetail.tsx#L38).
* `dataSource?: string | (obj: backendDetailObject) | undefined` – url to get data
  from backend.

  In some cases, you will need to get data for
  rendering in a widget (for example, in an asynchronous selection).
  To specify the path from where to get this data, you can use this setting.

  This can be a static value, or unpacking an object from the backend via
  an arrow function in case you use [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS)
* `dataTarget?: string | (obj: backendDetailObject) | undefined` – url to push data
  to backend.

  By default, ke will try to take url from your detal object from the backend.
  You can override this behavior by assigning a static url or using dynamic detail
  object unpacking via arrow function
* `targetPayload?: string | (value: widgetOnChangeValue) | undefined` – specifies
  backend payload format

  By default, ke will generate a backend payload in the
  `{ widgetName: onChangeValue }` format.

  You can override this behavior using a customization and arrow function.

  Function accepts the value from widget onChange method as input.
* `href?: string | (object: backendDetailObject) | undefined` – specific for [LinkWidget](https://github.com/best-doctor/ke/blob/master/src/DetailView/widgets/LinkWidget.tsx)

  Setup `href` attribute for link.
* `optionLabel: (object: backendDetailObject)` – specific for [ForeignKeySelectWidget](https://github.com/best-doctor/ke/blob/master/src/DetailView/widgets/ForeignKeySelect.tsx)

  Used to display the value in ForeignKeySelect.
  We use [react-select](https://react-select.com/home) for this widget under
  the hood

* `optionValue: (object: backendDetailObject)` – specific for [ForeignKeySelectWidget](https://github.com/best-doctor/ke/blob/master/src/DetailView/widgets/ForeignKeySelect.tsx)

  Used to set select value in ForeignKeySelect.
  We use [react-select](https://react-select.com/home) for this widget under
  the hood
* `layout: { x: number, y: number, w: number, h: number, static: boolean }` – layout
  settings.
  `ke` uses [react-grid-layout](https://github.com/STRML/react-grid-layout)
  for widgets compose. So, we use the same settings format

* `widgetAnalytics` – analytics event format control ([more details]())

* `notBlockingValidators` – list of validation functions with non-blocking checks.
  Used in wizards (coming soon)

* `blockingValidators` – list of validation functions with blocking checks.
  Used in wizards (coming soon)

## Example

```ts
{
  name: 'patient.full_name',
  widget: ForeignKeySelectWidget,
  dataSource: `${process.env.API_URL}patients/`,
  helpText: 'Пациент',
  targetPayload: (object: backendDetailObject) => ({ patient: object.id }),
  optionLabel: (object: backendDetailObject) => object.full_name,
  optionValue: (object: backendDetailObject) => object.id,
  layout: { x: 2, y: 1, w: 2.5, h: 1, static: true },
},
{
  name: 'some_help_text',
  widget: TextWidget,
  displayValue: 'Some help text',
},
{
  name: 'some_another_info',
  widget: TextWidget,
  displayValue: (object: backendDetailObject) => objectFormBackend.some_info,
},

```

After you have defined `detail_fields`,
`ke` will be able to generate detail view for your admin class.
