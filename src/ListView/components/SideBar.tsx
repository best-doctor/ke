import React from 'react'
import {
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/core'
import { FiMenu } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

import { goToResourceEvent } from '../events'

type SideBarProps = {
  name: string
  admin: {
    verboseName: string
  }
}

type SideBarElementType = {
  props: SideBarProps
}

const SideBarElement = ({ resource }: { resource: SideBarElementType }): JSX.Element => {
  const { push } = useHistory()
  const { props } = resource
  const { name, admin } = props
  const goToResource = (): void => {
    push(`/${name}/`)
    goToResourceEvent()
  }
  return (
    <Button variantColor="teal" m={2} key={name} onClick={goToResource} id="go-to-resource-button">
      {admin.verboseName}
    </Button>
  )
}

const SideBar = ({ header, children }: { header: string; children: JSX.Element[] }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  goToResourceEvent.watch(onClose)

  return (
    <>
      <Button variantColor="teal" m={2} width={20} ref={btnRef} onClick={onOpen}>
        <FiMenu />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{header}</DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="column">{children}</Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export { SideBar, SideBarElement }
