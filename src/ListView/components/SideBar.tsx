import React, { FC } from 'react'
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
import styled from 'styled-components'
import { Col, Row } from 'react-flexbox-grid'
import { goToResourceEvent } from '../events'
import { Breadcrumbs, TPathRules } from './Breadcrumbs/Breadcrumbs'

const SidebarButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const BreadCrumbContainer = styled.div`
  padding-left: 15px;
`

interface ISidebarProps {
  header: string
  breadcrumbsRules?: TPathRules
}

const SideBar: FC<ISidebarProps> = ({ header, children, breadcrumbsRules }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  goToResourceEvent.watch(onClose)

  return (
    <>
      <Row>
        <Col xs={12}>
          <SidebarButtonContainer>
            <Button colorScheme="brand" m={2} width={20} onClick={onOpen}>
              <Menu size="1em" />
            </Button>
            <BreadCrumbContainer>{breadcrumbsRules && <Breadcrumbs rules={breadcrumbsRules} />}</BreadCrumbContainer>
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

export { SideBar }
