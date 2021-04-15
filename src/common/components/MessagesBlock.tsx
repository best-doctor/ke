import { Box, Text } from '@chakra-ui/core'
import React from 'react'
import { AlertCircle, CheckCircle, HelpCircle, Icon, XCircle } from 'react-feather'

const messageTypeMapping: { [key: string]: string } = {
  success: '#65BBBB',
  warning: '#FFEAB3',
  error: '#FC6363',
  info: '#81C2FE',
}

const messageIconMapping: { [key: string]: Icon } = {
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
  info: HelpCircle,
}

const MessagesBlock = ({
  messages,
  messageType,
}: {
  messages: string[] | undefined
  messageType: string
}): JSX.Element => {
  if (typeof messages === 'undefined') return <></>

  const messageColor = messageTypeMapping[messageType]
  const messageIcon = messageIconMapping[messageType]

  return (
    <>
      {messages
        .filter((message: string | null) => message !== null)
        .map((message: string, index) => {
          const key = index
          return (
            <Box bg={messageColor} key={key} display="flex" alignItems="center" borderRadius="4px" m={4}>
              <Box as={messageIcon} size="1.5em" m={4} flexShrink={0} />
              <Text>{message}</Text>
            </Box>
          )
        })}
    </>
  )
}

export { MessagesBlock }
