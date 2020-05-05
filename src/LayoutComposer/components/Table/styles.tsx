import * as React from 'react'
import styled from 'styled-components'
import { Flex, IconButton } from '@chakra-ui/core'
import { color, justifyContent, space, SpaceProps } from 'styled-system'

const StyledTable = styled.div<SpaceProps>`
  ${space};
  flex: 1;
  width: 100%;
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  border-radius: 4px;
  flex-direction: column;
  box-sizing: border-box;
`

const TableCell = styled.div`
  ${space};
  ${color};
  ${justifyContent};
  flex: 1;
  display: flex;
  min-width: 150px;
  align-items: center;
  border-bottom-width: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TableHead = styled.div<SpaceProps>`
  ${space};
  display: flex;
  flex-direction: row;
  background-color: #edf2f7;
`

const TableRow = styled(Flex)`
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.01);
  }
`

type TableIconButtonProps = SpaceProps & {
  icon: any
  onClick: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined
  isDisabled: boolean
  children: JSX.Element
  variantColor?: string
}

const TableIconButton: any = ({ icon, onClick, isDisabled, children, variantColor, ...rest }: TableIconButtonProps) => {
  return (
    <IconButton
      size="sm"
      {...rest}
      icon={icon}
      borderWidth={1}
      onClick={onClick}
      variantColor={variantColor}
      isDisabled={isDisabled}
      aria-label="Table Icon button"
    >
      {children}
    </IconButton>
  )
}

export { StyledTable, TableCell, TableHead, TableRow, TableIconButton }
