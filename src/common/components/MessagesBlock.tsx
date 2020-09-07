import * as React from 'react'

const messageTypeMapping: { [key: string]: string } = {
  success: 'green',
  warning: 'orange',
  error: 'red',
  info: 'black',
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

  return (
    <ul>
      {messages
        .filter((message: string | null) => message !== null)
        .map((message: string) => (
          <li style={{ color: messageColor }}>{message}</li>
        ))}
    </ul>
  )
}

export { MessagesBlock }
