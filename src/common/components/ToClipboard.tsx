import { Box, BoxProps } from '@chakra-ui/react'
import type { BaseNotifier } from 'common/notifier'
import React, { useCallback } from 'react'
import { Copy } from 'react-feather'

interface ToClipboardProps extends BoxProps {
  value?: string | Function
  notifier?: BaseNotifier
  onClick?: () => void
}

export const ToClipboard = ({ value, onClick, notifier, children, ...rest }: ToClipboardProps): JSX.Element => {
  const handleClick = useCallback(() => {
    let realValue: string | undefined
    if (typeof value === 'function') {
      realValue = value()
    } else {
      realValue = value
    }
    if (realValue) {
      navigator.clipboard.writeText(realValue)
      if (notifier) notifier.notifySuccess('Скопировано в буфер обмена')
    }
    if (onClick) onClick()
  }, [onClick, notifier, value])

  return (
    <Box display="flex" alignItems="center" onClick={handleClick} {...rest}>
      <Box className="icon" as={Copy} size="1em" display="inline" color="blue.500" />
      {!!children && <Box ml={3}>{children}</Box>}
    </Box>
  )
}
