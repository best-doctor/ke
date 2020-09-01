import * as React from 'react'

import { Heading, Box } from '@chakra-ui/core'

const WizardValidationErrors = ({ errors }: { errors: string[] }): JSX.Element => {
  const ErrorDisplay = (): JSX.Element => (
    <Box m={5}>
      <Heading size="sm">Пожалуйста, исправьте ошибки ниже:</Heading>
      <ul>
        {errors.map((error: string) => (
          <li style={{ color: 'red' }}>{error}</li>
        ))}
      </ul>
    </Box>
  )

  if (errors.length > 0) {
    return <ErrorDisplay />
  }
  return <></>
}

export { WizardValidationErrors }
