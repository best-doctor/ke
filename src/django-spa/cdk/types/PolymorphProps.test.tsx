import React from 'react'

import { expectType } from 'tsd'

import { PolymorphProps } from './PolymorphProps'

interface BaseProps {
  foo: string
}

interface RequiredProps {
  bar: number
}

interface TargetProps extends RequiredProps {
  ext: boolean
}

function Target(_: TargetProps): JSX.Element {
  return <></>
}

test('Check correct extends', () => {
  expectType<PolymorphProps<RequiredProps, TargetProps, BaseProps>>({
    as: Target,
    foo: 'test',
    ext: true,
  })
})
