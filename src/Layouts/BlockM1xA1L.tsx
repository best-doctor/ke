import { makeSlots } from '@cdk/Layouts'
import { Box, Flex } from '@chakra-ui/core'
import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

import { ListVertical } from './ListVertical'

const StyledMapFilterWidget = styled.div`
  border-width: 1px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding: 5.4px;
  white-space: pre-line;
`

export const BlockM1xA1L = makeSlots(
  {
    M: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    S: ({ children }: PropsWithChildren<{}>) => <ListVertical>{children}</ListVertical>,
  },
  (slotElements) => (
    <StyledMapFilterWidget>
      <Flex height="400px">
        <Box flex={1}>{slotElements.M}</Box>
        <Box width="300px" marginLeft="5px">
          {slotElements.S}
        </Box>
      </Flex>
    </StyledMapFilterWidget>
  )
)
