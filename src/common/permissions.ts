const permissionsProvided = (permissions: string[] | undefined | null): boolean =>
  permissions !== undefined && permissions !== null && permissions.length > 0

const hasPermission = (permissions: string[], requiredPerm: string): boolean => {
  if (permissionsProvided(permissions) === false) {
    return false
  }

  const allowedPermissions = permissions.filter((codename: string) => codename === requiredPerm)

  return allowedPermissions.length > 0
}

const hasPermissions = (permissions: string[], requiredPerms: string[] | undefined): boolean => {
  if (permissionsProvided(requiredPerms) === false) {
    return false
  }

  // eslint-disable-next-line
  const allowedPermissions = requiredPerms!.filter((requiredPerm: string) => hasPermission(permissions, requiredPerm))

  return allowedPermissions.length > 0
}

const mountElement = (
  permissions: string[],
  requiredPermissions: string[] | undefined,
  element: React.ReactNode
): React.ReactNode | null => {
  if (permissionsProvided(requiredPermissions) === false) {
    return element
  }

  return hasPermissions(permissions, requiredPermissions) ? element : null
}

export { hasPermission, hasPermissions, permissionsProvided, mountElement }
