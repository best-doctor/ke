export type NotificationTitle = string
export type NotificationDescription = string

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
