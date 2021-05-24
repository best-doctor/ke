import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { ArrowLeft } from 'react-feather'

const ToListViewLink = ({ name }: { name: string }): JSX.Element => (
  <>
    <Link to={`/${name}/`}>
      <Button colorScheme="teal" variant="outline">
        <ArrowLeft size="1em" />К списку
      </Button>
    </Link>
  </>
)

export { ToListViewLink }
