# Integrators

Интеграторы - наборы вспомогательных компонентов, используемые для распределения
данных через React-контекст. Как правило, состоят из корневого компонента,
инициализирующего один или несколько провайдеров, и вложенных полиморфных
компонентов, берущих данные из контекста и пробрасывающих их в целевые.

Пример:
```typescript jsx
<RootIntegrator data={data} params={params}>
  <RootIntegrator.Filters as={CoolFilters} configs={filterConfigs} />
  <RootIntegrator.Data as={MyTable} columns={columns} />
  <RootIntegrator.Pagination as={SomePagination} />
</RootIntegrator>
```
`RootIntegrator` - задаёт общий контекст(ы), а `RootIntegrator.[Filters, etc]`
выделяют из всех данных некоторый поднабор и прокидывают его дальше в компонент, переданный в
prop `as`
