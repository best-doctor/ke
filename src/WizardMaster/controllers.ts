import { pushError, clearErrors, setInitialValue, submitChange } from './events'
import { containerErrorsStore, containerStore, initialStore } from './store'

containerErrorsStore.on(pushError, (state, value) => [...state, value]).on(clearErrors, () => [])

initialStore.on(setInitialValue, (state, value) => ({ ...state, ...value }))

containerStore.on(submitChange, (state, { payload }) => ({ ...state, ...payload }))

export { pushError, clearErrors, setInitialValue, submitChange }
