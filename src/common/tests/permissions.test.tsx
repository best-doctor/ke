import React from 'react'
import { permissionsProvided, hasPermission, hasPermissions, mountElement } from '../permissions'

const permissionsList = ['test_permission1', 'test_permission2']

const element = <p />

test.each([
  [permissionsList, true],
  [[], false],
  [null, false],
  [undefined, false],
])('Permissions list provided', (permissions, expectedResult) => {
  const result = permissionsProvided(permissions)

  expect(result).toEqual(expectedResult)
})

test.each([
  [permissionsList, 'test_permission1', true],
  [permissionsList, 'test_permission3', false],
  [[], 'test_permission1', false],
  [[], 'test_permission3', false],
])('Required permission provided', (permissions, requiredPermission, expectedResult) => {
  const result = hasPermission(permissions, requiredPermission)

  expect(result).toEqual(expectedResult)
})

test.each([
  [permissionsList, ['test_permission1'], true],
  [permissionsList, ['test_permission1', 'test_permission100500'], true],
  [permissionsList, ['test_permission3', 'test_permission1'], true],
  [permissionsList, ['test_permission8'], false],
  [[], ['test_permission1'], false],
  [[], ['test_permission3'], false],
  [[], undefined, false],
])('Required permissions provided', (permissions, requiredPermissions, expectedResult) => {
  const result = hasPermissions(permissions, requiredPermissions)

  expect(result).toEqual(expectedResult)
})

test.each([
  [permissionsList, ['test_permission1'], element],
  [permissionsList, ['test_permission1', 'test_permission100500'], element],
  [permissionsList, ['test_permission3', 'test_permission1'], element],
  [permissionsList, ['test_permission8'], null],
  [permissionsList, [], element],
  [permissionsList, undefined, element],
])('Mount element depends on permissions', (permissions, requiredPermissions, expectedResult) => {
  const result = mountElement(permissions, requiredPermissions, element)

  expect(result).toEqual(expectedResult)
})
