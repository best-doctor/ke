import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { ArrowLeft } from 'react-feather'

const ToListViewLink = ({ name }: { name: string }): JSX.Element => (
  <Button leftIcon={<ArrowLeft size="1em" />} as={Link} to={`/${name}/`} colorScheme="brand" variant="outline">
    К списку
  </Button>
)

export { ToListViewLink }
