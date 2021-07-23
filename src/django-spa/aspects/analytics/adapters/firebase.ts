import firebase from 'firebase/app'
import 'firebase/analytics'

import { BaseAnalytic } from './base'
import { AnalyticsPayload } from '../types'

type FirebaseConfigType = {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
  userId?: string
}

class FirebaseAnalytic extends BaseAnalytic<FirebaseConfigType, firebase.analytics.Analytics> {
  initialize(config: FirebaseConfigType): firebase.analytics.Analytics {
    if (!firebase.apps.length) {
      const { userId } = config

      firebase.initializeApp(config)
      firebase.analytics().setUserId(userId || '')
    }

    return firebase.analytics()
  }

  pushEvent({ eventName, eventPayload }: AnalyticsPayload): void {
    this.analyticHandler.logEvent(eventName, eventPayload)
  }
}

export { FirebaseAnalytic, FirebaseConfigType }
