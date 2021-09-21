/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ResourceDefaultConfig } from '../interfaces'
import { HttpClient } from '../request-types'
import { concatPath } from './concatPath'
import { getDataFieldOrDetailResponse } from './getDataFieldOrDetailResponse'
import { resovleRequestConfigAndKey } from './resolveRequestConfigAndKey'

export function getDefaultResourceConfig(client: HttpClient): ResourceDefaultConfig<unknown> {
  return {
    fetchResource: {
      fn(resourceKey, { lookupField, ...resourceConfig } = { method: 'GET' }) {
        return client({ ...resovleRequestConfigAndKey(resourceConfig, concatPath(resourceKey, lookupField)) }).then(
          ({ data }) => getDataFieldOrDetailResponse(data)
        )
      },
    },
    mutate: {
      fn(resourceKey, sourceData, { lookupField, ...resourceConfig } = {}) {
        return client({
          ...resovleRequestConfigAndKey(resourceConfig, concatPath(resourceKey, lookupField)),
          data: sourceData,
        }).then(({ data }) => getDataFieldOrDetailResponse(data))
      },
    },
    client,
  }
}
