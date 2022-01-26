import { FC } from 'react'
import { expectType } from 'tsd'
import { IntegratorInners, Integrator, InnerComponents } from './types'

describe('IntegratorInners', () => {
  test('Возвращает корректный словарь с типами вложенных компонентов', () => {
    interface Inners extends InnerComponents {
      First: FC<{ a: string }>
      Second: FC<{ b: number }>
    }

    const test = '' as unknown as IntegratorInners<Integrator<FC<{ c: boolean }>, Inners>>

    expectType<Inners>(test)
  })
})
