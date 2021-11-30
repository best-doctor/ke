import { Button } from '@chakra-ui/react'
import { goToResourceEvent } from 'ListView/events'
import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

interface ISideBarElementProps {
  title: string
  path: string
}

export const SideBarElement: FC<ISideBarElementProps> = ({ title, path }) => {
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
