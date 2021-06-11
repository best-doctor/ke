import styled from 'styled-components'
import { Box, Button, Text } from '@chakra-ui/react'

const defaultSideContainerWidth = '200px'
const defaultContainerHeight = '250px'
const defaultButtonWidth = '140px'

const SideContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: ${defaultSideContainerWidth};
  height: ${defaultContainerHeight};
`

const SideContainerTitle = styled(Text)`
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  height: 50px;
`

const CenterContainer = styled(Box)`
  height: ${defaultContainerHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`

const SelectButton = styled(Button)`
  width: ${defaultButtonWidth};
  margin-bottom: 5px;
`
export { CenterContainer, SideContainer, SelectButton, SideContainerTitle }
