import styled from '@emotion/styled'

const List = styled.ul`
  user-select: none;
  border: 1px solid #e0e0e0;
  list-style-position: inside;
  list-style-type: none;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
`

const ListItem = styled.li`
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.2s linear;

  &:hover {
    background-color: #ebebeb;
  }

  &.selected {
    background-color: #ebebeb;
  }

  &.disabled {
    opacity: 0.3;
  }
`

export { List, ListItem }
