import { createEvent } from 'effector'

const pushError = createEvent<{ widgetName?: string; errorText: string }>()
const clearErrors = createEvent()

const setInitialValue = createEvent<object>()
const submitChange = createEvent<{ payload: object }>()

export { setInitialValue, submitChange, clearErrors, pushError }
