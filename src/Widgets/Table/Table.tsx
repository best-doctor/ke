import { makeTable } from '@cdk/Tables'
import styled from 'styled-components'

export const StyledTable = makeTable(
  'table',
  styled.tr`
    thead & {
      background: #aaa;
    }
  `
)
