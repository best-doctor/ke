import { makeTable } from '@cdk/tables'
import styled from 'styled-components'
import { makeWrap } from '@cdk/wrapper'
import { makePartial } from '@cdk/Compatibility'
import { Box } from '@chakra-ui/react'

export const StyledTable = makeWrap(
  makeTable(
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
  ),
  makePartial(Box, { overflowX: 'auto' })
)
