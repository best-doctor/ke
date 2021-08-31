import {useConfig} from "../../../data-provider";

import {AccessConfig, AccessPayload, User} from './types'
import { AccessActionType } from './enums'
import { checkAccess } from './Access'
import {AspectKey} from "../enums";

export const useAccess = (user: User, resource: string, action: AccessActionType): AccessPayload => {
  const config = useConfig({key: AspectKey.ACCESS}) as AccessConfig

  return checkAccess(config, user, resource, action)
}
