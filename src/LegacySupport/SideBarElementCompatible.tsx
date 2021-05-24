import { useHistory } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import React from 'react'

export function SideBarElementCompatible({ path, navTitle }: SideBarElementProps): JSX.Element {
  const { push } = useHistory()

  return (
    <Button colorScheme="teal" m={2} key={path} onClick={() => push(path)}>
      {navTitle}
    </Button>
  )
}

interface SideBarElementProps {
  path: string
  navTitle: string
}
