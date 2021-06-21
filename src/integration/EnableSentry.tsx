import * as Sentry from '@sentry/react'
import React, { useEffect } from 'react'

type EnableSentryProps = {
  sentryDSN: string
  user?: { email: string }
  release?: string
}

const EnableSentry = ({ sentryDSN, user, release }: EnableSentryProps): JSX.Element => {
  useEffect(() => {
    if (sentryDSN) {
      Sentry.init({ dsn: sentryDSN, release })
      Sentry.configureScope((scope: Sentry.Scope) => scope.setUser({ email: user && user.email }))
    }
  }, [user, sentryDSN])

  return <></>
}

export { EnableSentry }
