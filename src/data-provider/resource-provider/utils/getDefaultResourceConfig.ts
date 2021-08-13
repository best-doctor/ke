/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ResourceDefaultConfig } from '../interfaces'
import { HttpClient, HttpResponse, ListResponse } from '../request-types'
import { concatPath } from './concatPath'
import { getDataFieldOrDetailResponse } from './getDataFieldOrDetailResponse'

export function getDefaultResourceConfig(client: HttpClient): ResourceDefaultConfig<unknown> {
  return {
    fetchResource: {
      fn(resourceKey, { lookupField, ...resourceConfig } = { method: 'GET' }) {
        return client(concatPath(resourceKey, lookupField), resourceConfig).then(({ data }) =>
          getDataFieldOrDetailResponse(data)
        )
      },
    },
    mutate: {
      fn(resourceKey, sourceData, { lookupField, ...resourceConfig } = {}) {
        return client(concatPath(resourceKey, lookupField), { ...resourceConfig, data: sourceData }).then(({ data }) =>
          getDataFieldOrDetailResponse(data)
        )
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
