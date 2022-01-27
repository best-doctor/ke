// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import styled from 'styled-components'
import { Flex, IconButton } from '@chakra-ui/react'
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
  height: 30px;
  display: flex;
  min-width: 200px;
  align-items: center;
  border-bottom-width: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TableHead = styled.div<SpaceProps>`
  ${space};
  display: flex;
  flex-direction: row;
  & > div[role='row'] {
    background-color: #edf2f7;
  }
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
  children?: JSX.Element
  colorScheme?: string
}

const TableIconButton = ({
  icon,
  onClick,
  isDisabled,
  children,
  colorScheme,
  ...rest
}: TableIconButtonProps): JSX.Element => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconButton
    size="sm"
    {...rest}
    icon={icon}
    borderWidth={1}
    onClick={onClick}
    colorScheme={colorScheme}
    isDisabled={isDisabled}
    aria-label="Table Icon button"
  >
    {children}
  </IconButton>
)

export { StyledTable, TableCell, TableHead, TableRow, TableIconButton }
