import { AccessDecision, AccessActionType } from './enums'

export type AccessConfig = {
  resources: Record<string, Partial<Record<AccessActionType, string[]>>>
}

export type AccessPayload = {
  decision: AccessDecision
  hasAccess: boolean
  message?: string
  fields?: string[]
}

export type User = {
  permissions: string[]
}
