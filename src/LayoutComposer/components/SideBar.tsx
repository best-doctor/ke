import * as React from 'react'
import { Flex, Button } from '@chakra-ui/core'
import { Menu } from 'react-feather'

const SideBar = (): JSX.Element => (
  <Flex flexDirection="column" backgroundColor="#EDF2F7">
    <Button variantColor="teal" m={2}>
      <Menu />
    </Button>
  </Flex>
)

export { SideBar }
