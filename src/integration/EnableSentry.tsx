import React, { useEffect } from 'react'
import * as Sentry from '@sentry/react'

type EnableSentryProps = {
  sentryDSN: string
  user?: { email: string }
  config?: Omit<Sentry.BrowserOptions, 'dsn'>
}

const EnableSentry = ({ sentryDSN, user, config }: EnableSentryProps): JSX.Element => {
  useEffect(() => {
    if (sentryDSN) {
      Sentry.init({ ...config, dsn: sentryDSN })
      Sentry.configureScope((scope: Sentry.Scope) => scope.setUser({ email: user && user.email }))
    }
  }, [user, sentryDSN, config])

  return <></>
}

export { EnableSentry }
