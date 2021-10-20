# Wrapper

Простой модуль для оборачивания одних компонентов в другие с сохранением props

Пример:

```typescript jsx
import { Table } from 'cool-table'

import { makeWrap } from './wrap.factory'

function StyledBox({ children }) {
  return <div class="fancy-box">{children}</div>
}

const WrappedTable = makeWrap(Table, StyledBox)
```
