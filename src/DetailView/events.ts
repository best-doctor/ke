import { createEvent } from 'effector'

type WidgetPayload = { url: string; payload: object }

const submitChange = createEvent<WidgetPayload>()
const setInitialValue = createEvent<object>()

export { submitChange, setInitialValue, WidgetPayload }
