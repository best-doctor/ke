import { ReactElement } from 'react'
import { AdminResourceCompatibleProps } from '../LegacySupport/AdminResourceCompatible'
import { AdminResourceProps } from './AdminResource'

export const isAdminResourceElement = (resource: ReactElement): resource is ReactElement<AdminResourceProps> => {
  const { props } = resource
  return Object.prototype.hasOwnProperty.call(props, 'admin') && Object.prototype.hasOwnProperty.call(props, 'name')
}

export const isCompatibleResourceElement = (
  resource: ReactElement
): resource is ReactElement<AdminResourceCompatibleProps> => {
  const { props } = resource
  return 'path' in props && 'navTitle' in props
}
