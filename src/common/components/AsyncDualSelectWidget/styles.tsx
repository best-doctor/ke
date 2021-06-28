import styled from 'styled-components'
import { Box, Button, Text } from '@chakra-ui/react'
import { CloseIcon, SearchIcon } from '@chakra-ui/icons'

const defaultSideContainerWidth = '200px'
const defaultContainerHeight = '250px'
const defaultButtonWidth = '140px'

const SideContainer = styled(Box)`
  display: flex;
  user-select: none;
  flex-direction: column;
  width: ${defaultSideContainerWidth};
  height: ${defaultContainerHeight};
`

const SideContainerTitle = styled(Text)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const StyledSearchIcon = styled(SearchIcon)`
  cursor: pointer;
  transition: color 0.2s linear;
  margin-left: 5px;

  &:hover {
    color: dodgerblue;
  }
`

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  color: dodgerblue !important;
  transition: color 0.2s linear;
  margin-left: 5px;

  &:hover {
    &:hover {
      color: crimson !important;
    }
  }
`

export { CenterContainer, SideContainer, SelectButton, SideContainerTitle, StyledSearchIcon, StyledCloseIcon }
