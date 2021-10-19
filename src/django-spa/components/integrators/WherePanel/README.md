# WherePanel

Компонент для расширения функционала блока фильтров. На данный момент только
набором предопределённых фильтров, но в будущем возможны и другие дополнения.

Сам компонент не предполагает какого-то дополнительного функционала, а только
предоставляет полиморфные компоненты для связывания компонентов фильтров и
предопределённых наборов.

Пример:
```typescript jsx
<WherePanel filters={{}} onFiltersChange={() => undefined}>
  <div className="filters">
    <WhereFilters as={Filters} filterConfigs={{}} />
  </div>
  <div className="predefined-filters">
    <WherePredefined as={RadioGroup}>
      <Radio value={{a: true}} />
      <Radio value={{a: false}} />
    </WherePredefined>
  </div>
</WherePanel>
```
