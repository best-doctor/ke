import { ReactElement } from 'react'
import { AdminResourceCompatibleProps } from '../LegacySupport/AdminResourceCompatible'
import { AdminResourceProps } from './AdminResource'

export type ResourceComposerChildType = ReactElement<AdminResourceProps | AdminResourceCompatibleProps>

export interface MenuItemMeta {
  title: string
  path: string
}
