import { ReactElement } from 'react'
import { IAdminResourceProps } from './AdminResource'

export type ResourceComposerChildType = ReactElement<
  | IAdminResourceProps
  | {
      path: string
      title: string
    }
>
