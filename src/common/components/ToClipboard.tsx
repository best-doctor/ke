import { Box, BoxProps, Icon } from '@chakra-ui/react'
import { Copy } from '@bestdoctor/icons'
import React, { useCallback } from 'react'
import type { BaseNotifier } from 'common/notifier'

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
    <Box as="button" type="button" display="flex" alignItems="center" onClick={handleClick} {...rest}>
      <Icon as={Copy} h={4} w={4} display="inline-block" color="blue.500" />
      {!!children && <Box ml={3}>{children}</Box>}
    </Box>
  )
}
