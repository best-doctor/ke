import React, { PropsWithChildren, ReactElement, useState } from 'react'
import { Box, Button, Flex } from '@chakra-ui/core'
import { makeSlots } from '@cdk/Layouts'

export const FilterClinics = (mainSlot: string) => {
  const Additional = ({ children, isOpen }: PropsWithChildren<{ isOpen: boolean }>) => {
    return isOpen ? (
      <Flex flexWrap="wrap" border="1px" borderColor="gray.200" borderRadius="md" my={2} p={3}>
        {children}
      </Flex>
    ) : null
  }
  const Buttons = ({ isOpen, additionalHandler }: { isOpen: boolean; additionalHandler: () => void }) => {
    return (
      <Box ml={2}>
        <Button mr={2} isActive={isOpen} onClick={additionalHandler}>
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
        buttons: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
        additional: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
      },
      (slotElements) => {
        const [additional, setAdditional] = useState(false)
        const handleClick = () => {
          setAdditional(!additional)
        }
        return (
          <Flex flexWrap="wrap">
            <Box flex={'2 0 0%'}>{slotElements.main}</Box>
            <Box flex={'1 0 0%'}>
              <Buttons isOpen={additional} additionalHandler={handleClick} />
            </Box>
            <Box flex={'1 0 100%'}>
              <Additional isOpen={additional}>{slotElements.additional}</Additional>
            </Box>
          </Flex>
        )
      }
    ),
  }
}
