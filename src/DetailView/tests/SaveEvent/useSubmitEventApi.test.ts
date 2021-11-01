import { renderHook } from '@testing-library/react-hooks'
import { useSaveEventApi } from '../../SaveEvent/hooks/useSubmitEventApi'

test('Должен вызывать всех подписчиков', () => {
  const {
    result: { current },
  } = renderHook(() => useSaveEventApi())

  const subscriber1 = jest.fn()
  const subscriber2 = jest.fn()

  current.on(subscriber1)
  current.on(subscriber2)

  current.dispatch()

  expect(subscriber1).toBeCalledTimes(1)
  expect(subscriber2).toBeCalledTimes(1)
})

test('Не должен вызывать подписчиков, которые отписались', () => {
  const {
    result: { current },
  } = renderHook(() => useSaveEventApi())

  const subscriber1 = jest.fn()
  const subscriber2 = jest.fn()

  current.on(subscriber1)
  current.on(subscriber2)
  current.off(subscriber2)

  current.dispatch()

  expect(subscriber1).toBeCalledTimes(1)
  expect(subscriber2).not.toBeCalledWith()
})

test('dispatch должен возвращать null если подписчиков нет', async () => {
  const {
    result: { current },
  } = renderHook(() => useSaveEventApi())

  const result = await current.dispatch()

  expect(result).toBeNull()
})

test('dispatch должен возвращать null если все подписчики вернули void', async () => {
  const {
    result: { current },
  } = renderHook(() => useSaveEventApi())

  const subscriber1 = jest.fn()
  const subscriber2 = jest.fn()

  current.on(subscriber1)
  current.on(subscriber2)

  const result = await current.dispatch()

  expect(result).toBeNull()
})

test('dispatch должен возвращать false если хотя бы один подписчик вернул false', async () => {
  const {
    result: { current },
  } = renderHook(() => useSaveEventApi())

  const subscriber1 = jest.fn(() => Promise.resolve(false))
  const subscriber2 = jest.fn()
  const subscriber3 = jest.fn(() => Promise.resolve(true))

  current.on(subscriber1)
  current.on(subscriber2)
  current.on(subscriber3)

  const result = await current.dispatch()

  expect(result).toBeFalsy()
})

test('dispatch должен возвращать true если ни один подписчик не вернул false, но хоть один вернул true', async () => {
  const {
    result: { current },
  } = renderHook(() => useSaveEventApi())

  const subscriber1 = jest.fn(() => Promise.resolve(true))
  const subscriber2 = jest.fn()

  current.on(subscriber1)
  current.on(subscriber2)

  const result = await current.dispatch()

  expect(result).toBeTruthy()
})
