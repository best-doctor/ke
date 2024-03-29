import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { goToResourceEvent } from '../events'

interface SideBarElementProps {
  title: string
  path: string
}

export const SideBarElement: FC<SideBarElementProps> = ({ title, path }) => {
  const { push } = useHistory()
  const goToResource = (): void => {
    push(path)
    goToResourceEvent()
  }
  return (
    <Button colorScheme="brand" m={2} key={title} onClick={goToResource}>
      {title}
    </Button>
  )
}
