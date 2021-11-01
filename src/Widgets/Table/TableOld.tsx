import { makeTable } from '@cdk/TablesOld'
import styled from 'styled-components'

export const StyledTable = makeTable(
  styled.table`
    text-align: left;
    width: 100%;
    tbody {
      vertical-align: top;
    }
  `,
  styled.tr`
    thead & {
      background: #f9fafa;
      border-bottom-width: 2px;
      border-color: #e3e5e8;
    }
    border-bottom-width: 1px;
    border-color: #e3e5e8;
    &:hover {
      background-color: #dde6f4;
    }
  `,
  styled.th`
    height: 3em;
    padding: 10px;
  `,
  styled.td`
    padding: 10px;
  `
)
