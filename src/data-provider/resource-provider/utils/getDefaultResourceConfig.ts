/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ResourceDefaultConfig } from '../interfaces'
import { HttpClient, HttpResponse, ListResponse } from '../request-types'
import { concatPath } from './concatPath'

export function getDefaultResourceConfig(client: HttpClient): ResourceDefaultConfig<unknown> {
  return {
    fetchResource: {
      fn(resourceKey, { lookupField, ...resourceConfig } = { method: 'GET' }) {
        return client(concatPath(resourceKey, lookupField), resourceConfig).then(({ data }) => {
          if (Object.keys(data).length === 1 && data?.data) {
            return data.data
          }
          return data
        })
      },
    },
    mutate: {
      fn(resourceKey, data, { lookupField, ...resourceConfig } = {}) {
        return client(concatPath(resourceKey, lookupField), { ...resourceConfig, data })
      },
    },
    fetchList: {
      fn(resourceKey, { lookupField, ...resourceConfig } = { method: 'GET' }, pageParams: object) {
        return client(concatPath(resourceKey, lookupField), {
          ...resourceConfig,
          params: {
            ...resourceConfig.params,
            ...pageParams,
          },
        }).then(({ data }: HttpResponse<ListResponse<unknown>>) => data)
      },
    },
    client,
  }
}
