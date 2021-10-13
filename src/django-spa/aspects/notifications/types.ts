import { ReactNode } from 'react'

export type NotificationTitle = ReactNode
export type NotificationDescription = ReactNode

export type NotificationsParams = {
  title?: NotificationTitle
  description?: NotificationDescription
  [key: string]: unknown
}

export type NotificationsHandler = {
  notify: (params: NotificationsParams) => void
  info: (params: NotificationsParams) => void
  warning: (params: NotificationsParams) => void
  success: (params: NotificationsParams) => void
  error: (params: NotificationsParams) => void
}

export type NotificationsConfig = {
  [key: string]: unknown
}
