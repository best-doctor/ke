import { Box } from '@chakra-ui/react'
import type { BaseNotifier } from 'common/notifier'
import React, { useCallback } from 'react'
import { Copy } from 'react-feather'
import styled from 'styled-components'

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onClick'>

interface ToClipboardProps extends ButtonProps {
  value?: string
  notifier?: BaseNotifier
  onClick?: () => void
}

const Root = styled.button`
  display: flex;
  align-items: center;
`

export const ToClipboard = ({ value, onClick, notifier, children, ...rest }: ToClipboardProps): JSX.Element => {
  const handleClick = useCallback(() => {
    if (value) {
      navigator.clipboard.writeText(value)
      if (notifier) notifier.notifySuccess('Скопировано в буфер обмена')
    }
    if (onClick) onClick()
  }, [onClick, notifier, value])

  return (
    <Root onClick={handleClick} {...rest}>
      <Box className="icon" as={Copy} size="1em" mr={3} display="inline" color="blue.500" />
      {children}
    </Root>
  )
}
