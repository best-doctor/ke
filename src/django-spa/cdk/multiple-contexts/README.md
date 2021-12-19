# Multiple-contexts

Модуль для упрощённого создания связанных контекстов React и полиморфных
компонентов доступа к ним.

## Решаемая проблема

Представим составной компонент для вывода примитивных данных:

```typescript jsx
function Simple(): ReactNode {
  const title = 'Test Title'
  const desc = 'Test description'

  return (
    <>
      <h1><ShowTitle title={title} /></h1>
      <p><ShowTitleAndDesc title={title} desc={desc} /></p>
    </>
  )
}
```

Обратим внимание, что `title` пробрасывается в оба вложенных компонента, образуя
неявную связь. Этот компонент слишком прост, чтобы здесь крылась какая-то проблема,
но если бы вложенных компонентов и различных данных было больше, при каких-либо
изменениях такие связи достаточно легко теряются.

На помощь может прийти React-context. Он позволяет пробрасывать данные от точки
определения на любую глубину дерева компонентов, предлагая вариант композиции
компонентов без необходимости гарантировать определённую структуру вложенности.
Пример, где в компоненте `Root` задаётся значение контекста, а компоненты
`ShowTitle` и `ShowTitleAndDesc` как-то его используют

```typescript jsx
<Root title="Test Title" desc="Test description">
  <h1><ShowTitle /></h1>
  <p><ShowTitleAndDesc /></p>
</Root>
```

Здесь мы можем быть уверены, что всем потребителям достанется одно и
то же значение.

Впрочем, мы всё ещё можем допустить ошибку получая данные из контекста, условно,
использовав `desc` вместо `title`. Особенно, если у нас целый набор компонентов
`ShowTitle` используемых в разных ситуациях, и в какой-то момент мы начали
переходить от ключа `title` к `fullTitle`.
Здесь мы переходим к полиморфным компонентам:

```typescript jsx
<Root title="Test Title" desc="Test description">
  <h1><ConsumeTitle as={ShowTitle} /></h1>
  <p><ConsumeTitleAndDesc as={ShowTitleAndDesc} /></p>
</Root>
```

Компоненты `ConsumeTitle` и `ConsumeTitleAndDesc` отвечают за получение данных из
контекста и передачу их внутрь вложенных компонентов в пропсе `as`. Естественно,
они накладывают ограничения к API вложенных компонентов. Это даёт возможность
использовать различные вариации вложенных компонентов в одном и том же контексте,
или один и тот же компонент в разных контекстах, до тех пор пока есть стыковка
по API. Что достаточно тривиально отследить благодаря TуpeScript

Т.е. использование полиморфных компонентов в связке с контекстом осмысленно
тогда, когда необходимо отвязать коллекцию одноплановых от непосредственно данных.

## Описание модуля

Основная функция модуля: `makeDistributedContext`. В зависимости от параметров
она может создать для одного или нескольких React-контекстов корневой компонент
их инициализации, а также фабричную-функцию для создания
компонентов-consumer'ов.

```typescript jsx
import { useMemo, createContext } from 'react'

import { makeCommonProvider } from './makeCommonProvider'
import { makeCommonConsumer } from './makeCommonConsumer'

type DataContext = unknown[]
type Params = { isActive: boolean }
type ParamsContext = [params: Params, onChange?: (params: Params) => void]

const dataContext = createContext<string[]>([])
const paramsContext = createContext<[
  { isActive: boolean },
  (v: unknown) => void | undefined
]>([{ isActive: true }])

const Root =
  makeCommonProvider({
    data: dataContext,
    params: paramsContext,
  })

const DataView = makeCommonConsumer({ data: dataContext })
const ParamsView = makeCommonConsumer({ params: dataContext }, ({ params: [params, _] }) => ({ params }))

function FilteredData({
                        data,
                        params
                      }: { data: unknown[], params: Params }): ReactNode {
  return (
    <Root data={data} params={paramsCtx}>
      <DataView as={Table} columns={[...smt]} />
      <ParamsView as={ParamsViewer} />
    </Root>
  )
}
```

В примере мы создаём компонент для вывода данных и значений фильтров, для которых
эти данные были получены.
