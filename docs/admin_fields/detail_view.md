# Detail view

To generate list view for your admin resource, you should setup
`detail_fields` setting in your admin class.

`ke` has a set of predefined widgets, which can be used to build admin detail view.

`detail_fields` setting uses javascript objects syntax
and can contains the following properties:

* `name: string` – path to data in JSON response from your backend.
  You should use dot notation to define the path to payload and `ke`
  will get it via lodash [`get`](https://lodash.com/docs/4.17.15#get)
* `widget: Component` – component to render an element on your detail view.
  `ke` has set of [predefined widgets](https://github.com/best-doctor/ke/tree/master/src/components)
  but you can implement your custom. While `ke` will mount widgets to page,
  it will try to pass all properties from detail field setting to your component.
  Also it will pass some additional props, like detail object from your backend,
  state setter, notifier and grid style props.
  So, you can unpack only those objects that your specific component needs via
  [js destructing syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
* `helpText?: string | undefined` – help text label for your widget
* `displayValue?: string | Function | undefined` – TODO
* `dataSource?: string | Function | undefined` – TODO
* `dataTarget?: string | Function | undefined` – TODO
* `targetPayload?: string | Function | undefined` – TODO
* `href?: string | Function | undefined` – TODO
* `layout: object` – layout settings. `ke` uses [react-grid-layout](https://github.com/STRML/react-grid-layout)
  for widgets compose. So, we use the same settings format

## Example

```ts
{
  name: 'patient.full_name',
  widget: ForeignKeySelectWidget,
  dataSource: `${process.env.API_URL}patients/`,
  helpText: 'Пациент',
  targetPayload: (object: any) => ({ patient: object.id }),
  optionLabel: (object: any) => object.full_name,
  optionValue: (object: any) => object.id,
  layout: { x: 2, y: 1, w: 2.5, h: 1, static: true },
},

```

After you have defined `list_fields`,
`ke` will be able to generate list view for your admin class.