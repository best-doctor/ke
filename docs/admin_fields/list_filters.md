# List filters

`list_filters` attribute is settings for displaying a list view filters.

It uses javascript object syntax and contains the following properties:

* `name: string` – String to generate server side filtering request.
  With `id` value it will generate `/api/patients/?id=100500`
* `label: string` – String to display human-readable name of filter in filters block
* `Filter: Component` – Filter widget for user input.
  You can implement your custom filter or use
  [predefined set](https://github.com/best-doctor/ke/blob/master/src/components/Table/filters.tsx)
  from `ke`
* `filterResource: string | undefined` – url which is used to fetch and
  fill filter options. It can be used for example with select filter widget.

## Example

```ts
import { MultiSelectFilter } from '@bestdoctor/ke'

list_filters = [
  {
    name: 'topic',
    label: 'Topic',
    Filter: MultiSelectFilter,
    filterResource: `${process.env.API_URL}topics/`,
  }
]
```

After you have defined `list_filters`,
`ke` will be able to render filter block on list view.