import * as React from 'react'
import { useEffect } from 'react'
import { init as initApm } from '@elastic/apm-rum'

const EnableELK = ({
  serviceName,
  serverUrl,
  serviceVersion,
}: {
  serviceName: string
  serverUrl: string
  serviceVersion: string
}): JSX.Element => {
  useEffect(() => {
    if (serviceName && serverUrl && serviceVersion) {
      initApm({ serviceName, serverUrl, serviceVersion })
    }
  }, [serviceName, serverUrl, serviceVersion])

  return <></>
}

export { EnableELK }
