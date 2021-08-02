import { useHistory } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { goToResourceEvent } from '../ListView/events'

export function SideBarElementCompatible({ path, navTitle }: SideBarElementProps): JSX.Element {
  const { push } = useHistory()

  return (
    <Button
      colorScheme="brand"
      m={2}
      key={path}
      onClick={() => {
        goToResourceEvent()
        push(path)
      }}
    >
      {navTitle}
    </Button>
  )
}

interface SideBarElementProps {
  path: string
  navTitle: string
}
