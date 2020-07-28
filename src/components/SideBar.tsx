import * as React from 'react'
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
import { Menu } from 'react-feather'

const SideBarElement = ({ resource }: { resource: JSX.Element }): JSX.Element => (
  <Button variantColor="teal" m={2} key={resource.props.name} onClick={() => (window.location.href = `${window.location.origin}/${resource.props.name}`)}>
    {resource.props.admin.verboseName}
  </Button>
)

const SideBar = ({ header, children }: { header: string; children: JSX.Element[] }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Button variantColor="teal" m={2} width={20} ref={btnRef} onClick={onOpen}>
        <Menu />
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
