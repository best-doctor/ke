import { createStore } from 'effector'

const containerErrorsStore = createStore<string[]>([])
const containerStore = createStore<{ [key: string]: object | null }>({})

export { containerErrorsStore, containerStore }
