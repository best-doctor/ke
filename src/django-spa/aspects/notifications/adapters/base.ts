import { NotificationsConfig, NotificationsHandler, NotificationsParams } from '../types'

interface Handler {
  notify: (params: NotificationsParams) => void
  info: (params: NotificationsParams) => void
  warning: (params: NotificationsParams) => void
  success: (params: NotificationsParams) => void
  error: (params: NotificationsParams) => void
}

abstract class BaseNotification<Config extends NotificationsConfig, THandler extends Handler>
  implements NotificationsHandler
{
  notificationHandler: THandler

  constructor(config: Config) {
    this.notificationHandler = this.initialize(config)
  }

  abstract initialize(config: Config): THandler

  abstract notify: (params: NotificationsParams) => void

  abstract info: (params: NotificationsParams) => void

  abstract warning: (params: NotificationsParams) => void

  abstract success: (params: NotificationsParams) => void

  abstract error: (params: NotificationsParams) => void
}

export { BaseNotification }
