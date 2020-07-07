import * as React from 'react'
import { useEffect } from 'react'
import * as Sentry from '@sentry/react'

type EnableSentryProps = {
  sentryDSN: string
  user?: any
}

const EnableSentry = ({ sentryDSN, user }: EnableSentryProps): JSX.Element => {
  useEffect(() => {
    Sentry.init({ dsn: sentryDSN })
    Sentry.configureScope((scope: any) => scope.setUser({ email: user && user.email }))
  }, [user, sentryDSN])

  return <></>
}

export { EnableSentry }
