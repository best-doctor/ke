import React from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/button/dist/types/button'

import { useIsMounted, usePropState } from '@cdk/Hooks'
import { ensurePromise } from '../../../DetailView/utils/dataAccess'

export const Button = (props: ButtonProps): JSX.Element => {
  const { onClick, isDisabled: initialDisabled } = props
  const [isDisabled, setIsDisabled] = usePropState<boolean>(initialDisabled || false)
  const isMountedRef = useIsMounted()

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    if (onClick) {
      setIsDisabled(true)
      return ensurePromise(onClick(e)).finally(() => {
        if (isMountedRef.current) {
          setIsDisabled(false)
        }
      })
    }
  }

  return <ChakraButton {...props} isDisabled={isDisabled} onClick={handleClick} />
}
