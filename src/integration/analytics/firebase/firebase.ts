/* eslint class-methods-use-this: ["error", { "exceptMethods": ["initialize"] }] */

import * as firebase from 'firebase/app'
import 'firebase/analytics'

import { BaseAnalytic } from '../base'

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

type FirebaseEventPayload = {
  resourceName: string
  resourceId: string
  widgetName: string
  widgetType: string
  url: string
  newValue?: string
  viewType: string
}

type FirebaseEvent = {
  eventName: string
  eventPayload: FirebaseEventPayload
}

class FirebaseAnalytic extends BaseAnalytic {
  initialize(config: FirebaseConfigType): any {
    if (!firebase.apps.length) {
      const { userId } = config

      firebase.initializeApp(config)
      firebase.analytics().setUserId(userId || '')
    }

    return firebase.analytics()
  }

  pushEvent({ eventName, eventPayload }: FirebaseEvent): void {
    this.analyticHandler.logEvent(eventName, eventPayload)
  }
}

export { FirebaseAnalytic, FirebaseEventPayload, FirebaseEvent, FirebaseConfigType }
