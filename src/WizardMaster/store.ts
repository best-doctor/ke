import { createStore } from 'effector'

type StoreElement = { [key: string]: object | null }
type ErrorElement = { widgetName?: string; errorText: string }

const containerErrorsStore = createStore<ErrorElement[]>([])
const initialStore = createStore<StoreElement>({})
const containerStore = createStore<StoreElement>({})

export { containerErrorsStore, containerStore, initialStore }
