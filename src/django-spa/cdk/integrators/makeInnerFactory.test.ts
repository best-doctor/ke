import { testProp, fc } from 'jest-fast-check'
import { pick } from '@utils/dicts'
import { expectType } from 'tsd'

import { makeInnerFactory } from './makeInnerFactory'

const contextArbitraryWithKeys = fc
  .dictionary(fc.string(), fc.anything())
  .chain((dict) => fc.tuple(fc.constant(dict), fc.shuffledSubarray(Object.keys(dict))))

const baseMakerResultArbitrary = fc.anything()

const randArgsArbitrary = fc.array(fc.anything(), { maxLength: 5 })

testProp(
  'Итоговая фабричная функция использует базовую фабричную функцию',
  [contextArbitraryWithKeys, baseMakerResultArbitrary, randArgsArbitrary],
  ([context, keys], baseResult, randArgs) => {
    const baseSpy = jest.fn().mockReturnValue(baseResult)
    const maker = makeInnerFactory(context, baseSpy)

    const result = maker(keys, ...randArgs)

    expect(baseSpy).toHaveBeenCalledTimes(1)
    expect(baseSpy).toHaveBeenCalledWith(pick(context, keys), ...randArgs)
    expect(result).toBe(baseResult)
  }
)

test('Функция возвращает корректный тип', () => {
  const context = {
    a: 'test',
    b: 12,
  }

  const base: (part: Partial<typeof context>, first: number, second: boolean) => boolean = () => true

  expectType<(keys: ('a' | 'b')[], first: number, second: boolean) => boolean>(makeInnerFactory(context, base))
})
