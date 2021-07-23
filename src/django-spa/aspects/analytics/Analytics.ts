import { useContext } from 'react'

import { AnalyticsHandler } from './types'
import { FirebaseAnalytic, FirebaseConfigType } from './adapters'
import { analyticsConfigContext } from './AnalyticsConfig.context'

export const useFirebase = (): AnalyticsHandler => {
  // TODO: Change to proper config when it's ready
  const config = useContext(analyticsConfigContext)

  try {
    return new FirebaseAnalytic(config as FirebaseConfigType)
  } catch (error: unknown) {
    return {
      pushEvent: () => {},
    }
  }
}
