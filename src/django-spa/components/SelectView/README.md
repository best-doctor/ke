# SelectView

Группа компонентов для работы со списками сущностей. Прежде всего обеспечивают
вывод, фильтрацию и сортировку.

Компоненты из этого пакета не реализуют функции сами по себе и содержат макета
по-умолчанию, но предоставляют обёртки для правильной функциональной связи
других чистых компонентов.

Пример:
```typescript jsx
<SelectView dataProvider={provider}>
  <SelectWhere as={MyFilter} configs={filterConfigs} />
  <SelectData as={MyTable} columns={columnConfigs} />
  <SelectPages as={MyPagination} />
</SelectView>
```
