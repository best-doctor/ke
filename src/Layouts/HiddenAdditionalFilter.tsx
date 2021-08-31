import React, { PropsWithChildren, useState } from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import { makeSlots } from '@cdk/Layouts'
import { Filter } from 'react-feather'

const Additional = ({ children, isOpen }: PropsWithChildren<{ isOpen: boolean }>): JSX.Element | null =>
  isOpen ? (
    <Flex flexWrap="wrap" mt={4}>
      {children}
    </Flex>
  ) : null
const Buttons = ({ isOpen, additionalHandler }: { isOpen: boolean; additionalHandler: () => void }): JSX.Element => (
  <Box>
    <Button
      bg={isOpen ? '#C7CAD1' : '#F1F2F4'}
      leftIcon={<Filter />}
      mr={2}
      isActive={isOpen}
      onClick={additionalHandler}
    >
      Фильтры
    </Button>
  </Box>
)

export const HiddenAdditionalFilter = makeSlots<'main' | 'buttons' | 'additional'>((slotElements) => {
  const [additional, setAdditional] = useState(false)
  const handleClick = (): void => {
    setAdditional(!additional)
  }
  return (
    <Flex flexWrap="wrap" mb={4}>
      <Box flex="1 1 0%">
        <Buttons isOpen={additional} additionalHandler={handleClick} />
      </Box>
      <Box flex="0 0 0%">{slotElements.main}</Box>
      <Box flex="1 0 100%">
        <Additional isOpen={additional}>{slotElements.additional}</Additional>
      </Box>
    </Flex>
  )
})
