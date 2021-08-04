import { AccessDecision, AccessActionType } from './enums'
import { checkAccess } from './Access'

const config = {
  resources: {
    'api/clinics': {
      [AccessActionType.CREATE]: ['create_clinic', 'change_clinic'],
      [AccessActionType.DELETE]: [],
    },
  },
}

test('Approved access', () => {
  const result = checkAccess(
    config,
    { permissions: ['create_clinic', 'change_clinic'] },
    'api/clinics',
    AccessActionType.CREATE
  )

  expect(result).toStrictEqual({ decision: AccessDecision.APPROVED, hasAccess: true })
})

test('Approved access for empty permissions', () => {
  const result = checkAccess(
    config,
    { permissions: ['create_clinic', 'change_clinic'] },
    'api/clinics',
    AccessActionType.DELETE
  )

  expect(result).toStrictEqual({ decision: AccessDecision.APPROVED, hasAccess: true })
})

test('Denied access - None of permissions match', () => {
  const result = checkAccess(config, { permissions: ['view_clinic'] }, 'api/clinics', AccessActionType.CREATE)

  expect(result).toStrictEqual({
    decision: AccessDecision.DENIED,
    hasAccess: false,
    message: 'Missing permissions create_clinic,change_clinic',
  })
})

test('Denied access - Not all permissions match', () => {
  const result = checkAccess(config, { permissions: ['create_clinic'] }, 'api/clinics', AccessActionType.CREATE)

  expect(result).toStrictEqual({
    decision: AccessDecision.DENIED,
    hasAccess: false,
    message: 'Missing permissions change_clinic',
  })
})

test('Not applicable access - Unknown action', () => {
  const result = checkAccess(config, { permissions: ['create_clinic'] }, 'api/clinics', AccessActionType.CHANGE)

  expect(result).toStrictEqual({
    decision: AccessDecision.NOT_APPLICABLE,
    hasAccess: false,
    message: 'Unknown action change for resource api/clinics',
  })
})

test('Not applicable access - Unknown resource', () => {
  const result = checkAccess(
    config,
    { permissions: ['create_clinic', 'change_clinic'] },
    'api/visits',
    AccessActionType.CREATE
  )

  expect(result).toStrictEqual({
    decision: AccessDecision.NOT_APPLICABLE,
    hasAccess: false,
    message: 'Unknown resource api/visits',
  })
})
