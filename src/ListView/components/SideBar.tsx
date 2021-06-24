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
} from '@chakra-ui/react'
import { Menu } from 'react-feather'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Col, Row } from 'react-flexbox-grid'
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
    <Button colorScheme="teal" m={2} key={name} onClick={goToResource} id="go-to-resource-button">
      {admin.verboseName}
    </Button>
  )
}

const SidebarButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const BreadCrumbContainer = styled.div`
  padding-left: 15px;
`

const SideBar = ({
  header,
  children,
  breadCrumbChildren,
}: {
  header: string
  children: JSX.Element[]
  breadCrumbChildren?: JSX.Element
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  goToResourceEvent.watch(onClose)

  return (
    <>
      <Row>
        <Col xs={12}>
          <SidebarButtonContainer>
            <Button colorScheme="teal" m={2} width={20} onClick={onOpen}>
              <Menu size="1em" />
            </Button>
            <BreadCrumbContainer>{breadCrumbChildren}</BreadCrumbContainer>
          </SidebarButtonContainer>
        </Col>
      </Row>
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
