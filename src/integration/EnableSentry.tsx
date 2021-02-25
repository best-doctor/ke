import React, { useEffect } from 'react'
import * as Sentry from '@sentry/react'

type EnableSentryProps = {
  sentryDSN: string
  user?: { email: string }
}

const EnableSentry = ({ sentryDSN, user }: EnableSentryProps): JSX.Element => {
  useEffect(() => {
    if (sentryDSN) {
      Sentry.init({ dsn: sentryDSN })
      Sentry.configureScope((scope: any) => scope.setUser({ email: user && user.email }))
    }
  }, [user, sentryDSN])

  return <></>
}

export { EnableSentry }
