# ListView

Группа компонентов для работы со списками сущностей. Прежде всего обеспечивают
вывод, фильтрацию и сортировку.

Компоненты из этого пакета не реализуют функции сами по себе и содержат макета
по-умолчанию, но предоставляют обёртки для правильной функциональной связи
других чистых компонентов.

Пример:
```typescript jsx
<ListView dataProvider={provider}>
  <ListFilters as={MyFilter} configs={filterConfigs} />
  <ListData as={MyTable} columns={columnConfigs} />
  <ListPagination as={MyPagination} />
</ListView>
```
