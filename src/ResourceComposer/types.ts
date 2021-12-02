import { ReactElement } from 'react'
import { AdminResourceProps } from './AdminResource'

export type ResourceComposerChildType = ReactElement<
  | AdminResourceProps
  | {
      path: string
      title: string
    }
>
