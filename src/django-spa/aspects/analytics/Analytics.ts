import { AnalyticsHandler } from './types'
import { FirebaseAnalytic, FirebaseConfigType } from './adapters'
import { useConfig } from '../../../data-provider'
import { AspectKey } from '../enums'

export const useFirebase = (): AnalyticsHandler => {
  const config = useConfig({ key: AspectKey.ANALYTICS })

  try {
    return new FirebaseAnalytic(config as FirebaseConfigType)
  } catch (error: unknown) {
    return {
      pushEvent: () => {},
    }
  }
}
