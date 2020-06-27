import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/core'
import styled from 'styled-components'
import { ArrowLeft } from 'react-feather'

const StyledLink = styled.div`
  transform: translate(30px, 10px);
`

const ToListViewLink = ({ name }: { name: string }): JSX.Element => (
  <StyledLink>
    <Link to={`/${name}/`}>
      <Button variantColor="teal" variant="outline">
        <ArrowLeft />К списку
      </Button>
    </Link>
  </StyledLink>
)

export { ToListViewLink }
