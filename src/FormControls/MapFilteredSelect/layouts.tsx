import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

import { LayoutComponent, makeSlots, SlotElements } from '../../cdk/Layouts'

export const getDefaultMapLayout = (mapHeight: number): LayoutComponent<SlotElements<'map' | 'filters'>> =>
  makeSlots<'map' | 'filters'>((slotElements) => (
    <Flex height={mapHeight}>
      <Box flex={1}>{slotElements.map}</Box>
      <Box width="300px" marginLeft="5px" height={mapHeight} overflowY="auto">
        {slotElements.filters}
      </Box>
    </Flex>
  ))

export const getVerticalMapLayout = (mapHeight: number): LayoutComponent<SlotElements<'map' | 'filters'>> =>
  makeSlots<'map' | 'filters'>((slotElements) => (
    <>
      {slotElements.filters}
      <Box flex={1} height={mapHeight}>
        {slotElements.map}
      </Box>
    </>
  ))

export const getFiltersLeftMapLayout = (mapHeight: number): LayoutComponent<SlotElements<'map' | 'filters'>> =>
  makeSlots<'map' | 'filters'>((slotElements) => (
    <Flex height={mapHeight}>
      <Box width="392px" mr={2} height={mapHeight} overflowY="auto">
        {slotElements.filters}
      </Box>
      <Box position="relative" flex={1}>
        {slotElements.map}
      </Box>
    </Flex>
  ))
