import { ReactElement } from 'react'
import { ICompatibleAdminResourceProps } from '../LegacySupport/AdminResourceCompatible'
import { IAdminResourceProps } from './AdminResource'

export const isAdminResourceElement = (resource: ReactElement): resource is ReactElement<IAdminResourceProps> => {
  const { props } = resource
  return Object.prototype.hasOwnProperty.call(props, 'admin') && Object.prototype.hasOwnProperty.call(props, 'name')
}

export const isCompatibleResourceElement = (
  resource: ReactElement
): resource is ReactElement<ICompatibleAdminResourceProps> => {
  const { props } = resource
  return 'path' in props && 'navTitle' in props
}
