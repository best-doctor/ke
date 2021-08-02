/* eslint-disable no-console */
import { Text, TextProps, useMultiStyleConfig } from '@chakra-ui/react'
import React from 'react'

export interface LabelProps extends TextProps {
  isRequired?: boolean
}

export const Label = ({ isRequired, children, ...props }: LabelProps): JSX.Element => {
  const styles = useMultiStyleConfig('Label', props)

  return (
    <Text sx={styles.label} as="label" {...props}>
      {children}
      {isRequired && (
        <Text sx={styles.asterisk} as="span">
          *
        </Text>
      )}
    </Text>
  )
}
