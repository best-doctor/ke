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
  Link,
} from '@chakra-ui/core'
import { Menu } from 'react-feather'

const SideBar = ({ resourceList }: { resourceList: JSX.Element[] | JSX.Element }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <Flex flexDirection="column" backgroundColor="#EDF2F7">
      <Button variantColor="teal" m={2} ref={btnRef} onClick={onOpen}>
        <Menu />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Разделы</DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="column">
              {React.Children.map(resourceList, (resource: JSX.Element) => (
                <Button variantColor="teal" m={2} key={resource.props.name}>
                  <Link href={`${window.location.origin}/${resource.props.name}`}>
                    {resource.props.admin.verboseName}
                  </Link>
                </Button>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export { SideBar }
