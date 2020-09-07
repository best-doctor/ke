import { createStore } from 'effector'

type StoreElement = { [key: string]: object | null }

const containerErrorsStore = createStore<string[]>([])
const initialStore = createStore<StoreElement>({})
const containerStore = createStore<StoreElement>({})

export { containerErrorsStore, containerStore, initialStore }
