# Admin list view

To generate list view for your admin resource, you should setup
`list_field` setting in your admin class. `ke` uses
[react-table](https://github.com/tannerlinsley/react-table) under the hood
to generate table for list view.

So, we use the same settings format to describe table columns,
but with some additions.

Firstly, we use separate filters settings, which is called [`list_filters`](https://github.com/best-doctor/ke/blob/master/docs/admin_fields/list_filters.md)

Secondly, we have `toDetailRoute: string | undefined` setting.
It tells the table to use this column as detail route with a given url.

## Example

```ts
list_fields = [
  {
    id: 'number',
    Header: 'Номер',
    toDetailRoute: '/appeals',
    accessor: (row: any) => row.id,
  },
  {
    id: 'status',
    Header: 'Статус',
    accessor: (row: any) => row.status.text,
  },
  {
    id: 'phone',
    Header: 'Номер телефона',
    accessor: (row: any) => row.patient && row.patient.phone,
  },
]
```

After you have defined `list_fields`,
`ke` will be able to generate list view for your admin class.
