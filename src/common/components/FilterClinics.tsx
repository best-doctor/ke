import React, { PropsWithChildren, ReactElement } from 'react'
import { Box, Button, Flex } from '@chakra-ui/core'
import { makeSlots } from '@cdk/Layouts'

export const FilterClinics = (mainSlot: string) => {
  let isOpen = false
  const handleOpen = () => {
    isOpen = true
  }
  const handleClose = () => {
    isOpen = false
  }
  const Additional = ({ children, isOpen }: PropsWithChildren<{ isOpen: boolean }>) => {
    return isOpen ? (
      <Flex flexWrap="wrap" border="1px" borderColor="gray.200" borderRadius="md" my={2} p={3}>
        {children}
      </Flex>
    ) : null
  }
  const Buttons = ({ isOpen, open, close }: { isOpen: boolean; open: () => void; close: () => void }) => {
    const toggleAdditional = () => {
      isOpen ? open() : close()
    }
    return (
      <Box ml={2}>
        <Button mr={2} onClick={toggleAdditional}>
          {isOpen ? 'Скрыть фильтры' : 'Раскрыть фильтры'}
        </Button>
        <Button>Сбросить</Button>
      </Box>
    )
  }
  return {
    layoutProxy: (elements: [string, ReactElement][]) =>
      elements.reduce(
        (slots: any, [key, element]: [string, any]) => {
          switch (key) {
            case mainSlot:
              slots['main'] = element
              break
            default:
              slots['additional'].push(element)
          }
          return slots
        },
        { main: null, additional: [], buttons: null }
      ),
    filterClinicsLayout: makeSlots(
      {
        main: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
        buttons: () => <Buttons isOpen={isOpen} open={handleOpen} close={handleClose} />,
        additional: ({ children }: PropsWithChildren<{}>) => <Additional isOpen={isOpen}>{children}</Additional>,
      },
      (slotElements) => (
        <Flex flexWrap="wrap">
          <Box flex={'2 0 0%'}>{slotElements.main}</Box>
          <Box flex={'1 0 0%'}>{slotElements.buttons}</Box>
          <Box flex={'1 0 100%'}>{slotElements.additional}</Box>
        </Flex>
      )
    ),
  }
}
