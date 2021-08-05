import React, { useRef, useEffect } from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/button/dist/types/button'

import { usePropState } from '@cdk/Hooks'
import { ensurePromise } from '../../../DetailView/utils/dataAccess'

export const Button = (props: ButtonProps): JSX.Element => {
  const { onClick, isDisabled: initialDisabled } = props
  const [isDisabled, setIsDisabled] = usePropState<boolean>(initialDisabled || false)
  const isMounted = useRef(false)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    if (onClick) {
      setIsDisabled(true)
      return ensurePromise(onClick(e)).finally(() => {
        /**
         * Promise can resolve after component is unmounted,
         * so we ensure that we set state while component is mounted.
         */
        if (isMounted.current) {
          setIsDisabled(false)
        }
      })
    }
  }

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return <ChakraButton {...props} isDisabled={isDisabled} onClick={handleClick} />
}
