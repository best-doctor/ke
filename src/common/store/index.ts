import { createEffect, createEvent, createStore } from 'effector'

import type { Provider } from 'admin/providers/interfaces'

type ListEvent = {
  resourceUrl: string
  provider: Provider
}

type DetailEvent = {
  resourceUrl: string
  resourceId: string
  provider: Provider
}

const storeListResource = createEvent<ListEvent>()

const storeDetailResource = createEvent<DetailEvent>()

const storeListEffect = createEffect({
  async handler({ resourceUrl, provider }: { resourceUrl: string; provider: Provider }): Promise<any[]> {
    const [data, ,] = await provider.getPage(resourceUrl)

    return [data, resourceUrl]
  },
})

const storeDetailEffect = createEffect({
  async handler({
    resourceUrl,
    resourceId,
    provider,
  }: {
    resourceUrl: string
    resourceId: string
    provider: Provider
  }): Promise<any[]> {
    const data = await provider.getObject(`${resourceUrl}${resourceId}/`)

    return [data, resourceUrl + resourceId]
  },
})

const effectorStore = createStore<object>({})
  .on(storeListResource, (state: any, { resourceUrl, provider }: ListEvent): void => {
    !state[resourceUrl] && storeListEffect({ resourceUrl, provider })
  })
  .on(storeDetailResource, (state: any, { resourceUrl, resourceId, provider }: DetailEvent): void => {
    !state[resourceUrl + resourceId] && storeDetailEffect({ resourceUrl, resourceId, provider })
  })
  .on(storeListEffect.done, (state: any, { result }): object => {
    const [data, resourceUrl] = result
    return { ...state, ...{ [resourceUrl]: data } }
  })

class StoreManager {
  static storeList(resourceUrl: string, provider: Provider): void {
    storeListResource({ resourceUrl, provider })
  }

  static storeDetail(resourceUrl: string, resourceId: string, provider: Provider): void {
    storeDetailResource({ resourceUrl, resourceId, provider })
  }

  static getResource(resourceKey: string): any {
    const state: any = effectorStore.getState()

    return state[resourceKey]
  }
}

export { StoreManager }
