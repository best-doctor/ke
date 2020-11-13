import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/core'
import { FiArrowLeft } from 'react-icons/fi'

const ToListViewLink = ({ name }: { name: string }): JSX.Element => (
  <>
    <Link to={`/${name}/`}>
      <Button variantColor="teal" variant="outline">
        <FiArrowLeft />К списку
      </Button>
    </Link>
  </>
)

export { ToListViewLink }
