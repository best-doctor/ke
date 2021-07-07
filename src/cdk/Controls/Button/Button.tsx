import React from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/button/dist/types/button'

import { usePropState } from '@cdk/Hooks'
import { ensurePromise } from '../../../DetailView/utils/dataAccess'

export const Button = (props: ButtonProps): JSX.Element => {
  const { onClick, isDisabled: initialDisabled } = props
  const [isDisabled, setIsDisabled] = usePropState<boolean>(initialDisabled || false)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    if (onClick) {
      setIsDisabled(true)
      return ensurePromise(onClick(e)).then(() => {
        setIsDisabled(false)
      })
    }
  }

  return <ChakraButton {...props} isDisabled={isDisabled} onClick={handleClick} />
}
