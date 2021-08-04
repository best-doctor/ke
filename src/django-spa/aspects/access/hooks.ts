import { useContext } from 'react'

import { accessConfigContext } from './AccessConfig.context'
import { AccessPayload, User } from './types'
import { AccessActionType } from './enums'
import { checkAccess } from './Access'

export const useAccess = (user: User, resource: string, action: AccessActionType): AccessPayload => {
  // TODO: Remove when proper config is ready
  const config = useContext(accessConfigContext)

  return checkAccess(config, user, resource, action)
}
