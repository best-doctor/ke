import { SyncReadWriteProvider } from '@cdk/Providers'
import { createEvent, createStore, Store, Event } from 'effector'

interface StoreData {
  [key: string]: string
}

export class SyncReadWriteStoreProvider implements SyncReadWriteProvider<StoreData> {
  store: Store<StoreData>

  saveEvent: Event<StoreData>

  constructor() {
    this.saveEvent = createEvent()
    this.store = createStore({}).on(this.saveEvent, (state, payload): StoreData => ({ ...state, ...payload }))
  }

  read(): StoreData {
    return this.store.getState()
  }

  write(value: StoreData): void {
    this.saveEvent(value)
  }
}
