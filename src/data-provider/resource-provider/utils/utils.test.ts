import axios, { AxiosInstance } from 'axios'
import { concatPath } from './concatPath'
import { getDefaultResourceConfig } from './getDefaultResourceConfig'

describe('concatPath', () => {
  it('should add slash to base url', () => {
    expect(concatPath('https://test.com')).toBe('https://test.com/')
  })

  it('should not add slash to base url if slash exists', () => {
    expect(concatPath('https://test.com/')).toBe('https://test.com/')
  })

  it('should return slash', () => {
    expect(concatPath('')).toBe('/')
  })

  it('should remove slash for lookup field', () => {
    expect(concatPath('https://test.com/', '/lookup')).toBe('https://test.com/lookup')
  })

  it('should works fine with numbers', () => {
    expect(concatPath('https://test.com/', 1)).toBe('https://test.com/1')
  })

  it('should split base url and lookup field with slash', () => {
    expect(concatPath('https://test.com', 'lookup')).toBe('https://test.com/lookup')
  })
})

describe('default resource config', () => {
  it('should return fetcn function for every request type', () => {
    const config = getDefaultResourceConfig(axios)
    expect(config.fetchResource.fn).toBeDefined()
    expect(config.mutate.fn).toBeDefined()
    expect(config.fetchList.fn).toBeDefined()
  })
})

function getFakeAxios(response: any): AxiosInstance {
  const fakeAxios = ((() => Promise.resolve(response)) as unknown) as AxiosInstance
  return fakeAxios
}

describe('fetchResourceFunction', () => {
  it('should return data field from response data if it only field in object', async () => {
    const config = getDefaultResourceConfig(
      getFakeAxios({
        data: {
          data: 'some data',
        },
      })
    )
    const response = await config.fetchResource.fn('test')

    expect(response).toBe('some data')
  })

  it('should return data from response', async () => {
    const config = getDefaultResourceConfig(
      getFakeAxios({
        data: {
          meta: 'some meta',
          data: 'some data',
        },
      })
    )
    const response = await config.fetchResource.fn('test')

    expect(response).toEqual(
      expect.objectContaining({
        meta: 'some meta',
        data: 'some data',
      })
    )
  })
})
