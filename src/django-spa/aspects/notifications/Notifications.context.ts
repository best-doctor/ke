import { createContext, useContext } from 'react'
import type { NotificationsHandler } from './types'
import { ToastNotification } from './adapters'

const notificationsContext = createContext<NotificationsHandler>(new ToastNotification({}))

export const NotificationsProvider = notificationsContext.Provider

export function useNotifications(): NotificationsHandler {
  return useContext(notificationsContext)
}
