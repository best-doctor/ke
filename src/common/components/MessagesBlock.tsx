// Это легаси
/* eslint-disable react/jsx-props-no-spreading */
import { Box, BoxProps, Text, TextProps } from '@chakra-ui/react'
import React from 'react'
import { AlertCircle, CheckCircle, HelpCircle, Icon } from 'react-feather'

const messageTypeMapping: { [key: string]: string } = {
  success: '#65BBBB',
  warning: '#FFEAB3',
  error: '#FEB2B2',
  info: '#81C2FE',
}

const messageIconMapping: { [key: string]: Icon } = {
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
  info: HelpCircle,
}

const MessagesBlock = ({
  messages,
  messageType,
  messageProps,
  messageTextProps,
}: {
  messages: (string | JSX.Element)[] | undefined
  messageType: string
  messageProps?: BoxProps
  messageTextProps?: TextProps
}): JSX.Element => {
  if (typeof messages === 'undefined') return <></>

  const messageColor = messageTypeMapping[messageType]
  const messageIcon = messageIconMapping[messageType]

  return (
    <>
      {messages
        .filter((message: string | JSX.Element | null) => message !== null)
        .map((message: string | JSX.Element, index) => {
          const key = index
          return (
            <Box
              bg={messageColor}
              key={key}
              display="flex"
              borderRadius="4px"
              justifyContent="center"
              p={3}
              mt={4}
              sx={{
                '& + &': {
                  mt: 2,
                },
              }}
              {...messageProps}
            >
              <Box as={messageIcon} size="21px" mt="1px" flexShrink={0} />
              <Text ml={2} {...messageTextProps}>
                {message}
              </Text>
            </Box>
          )
        })}
    </>
  )
}

export { MessagesBlock }
