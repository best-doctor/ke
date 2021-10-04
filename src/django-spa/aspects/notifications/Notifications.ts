import { useConfig } from '../../../data-provider'

import { NotificationsHandler } from './types'
import { ToastNotification } from './adapters'
import { AspectKey } from '../enums'

export const useToastNotifications = (): NotificationsHandler => {
  const config = useConfig({ key: AspectKey.NOTIFICATIONS })

  return new ToastNotification(config)
}
