# Layouts

Набор фабричных и вспомогательных функций для создания компонентов-макетов

Компонент-макет - это react-компонент, предоставляющий варианты компоновки
на странице для других компонентов, плюс, возможно, небольшие UX-фичи, типа
скрытия отдельных блоков.

Пример макета:
```typescript jsx
<PageLayout>{{
  header: <div>Cool header</div>,
  body: <article>Somebody once told me...</article>
}}</PageLayout>

// Может отрендериться примерно в зависимости от содержимого макета:
<PageLayout>
  <section>
    <header><div>Cool header</div></header>
    <div class="body"><article>Somebody once told me...</article></div>
  </section>
</PageLayout>
```
