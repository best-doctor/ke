import { pushError, clearErros, setInitialValue, submitChange } from './events'
import { containerErrorsStore, containerStore, initialStore } from './store'

containerErrorsStore.on(pushError, (state, value) => [...state, value]).on(clearErros, () => [])

initialStore.on(setInitialValue, (state, value) => ({ ...state, ...value }))

containerStore.on(submitChange, (state, { payload }) => ({ ...state, ...payload }))

export { pushError, clearErros, setInitialValue, submitChange }
