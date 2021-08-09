import { AccessConfig, AccessPayload, User } from './types'
import { AccessDecision, AccessActionType } from './enums'

export const checkAccess = (
  config: AccessConfig,
  user: User,
  resource: string,
  action: AccessActionType
): AccessPayload => {
  const resourcePermissions = config.resources[resource]?.[action]

  if (!resourcePermissions) {
    const message =
      resource in config.resources
        ? `Unknown action ${action} for resource ${resource}`
        : `Unknown resource ${resource}`
    return { decision: AccessDecision.NOT_APPLICABLE, hasAccess: false, message }
  }

  if (!resourcePermissions.every((permission) => user.permissions.includes(permission))) {
    const missingPermissions = resourcePermissions.filter((permission) => !user.permissions.includes(permission))
    return {
      decision: AccessDecision.DENIED,
      hasAccess: false,
      message: `Missing permissions ${missingPermissions.join(',')}`,
    }
  }

  return { decision: AccessDecision.APPROVED, hasAccess: true }
}
