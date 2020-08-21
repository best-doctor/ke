import { pushError, clearErros, setInitialValue, submitChange, pushWizardStepToBackend } from './actions'
import { containerErrorsStore, containerStore } from './store'

containerErrorsStore.on(pushError, (state, value) => [...state, value]).on(clearErros, () => [])

containerStore
  .on(setInitialValue, (state, value) => {
    return { ...state, ...value }
  })
  .on(submitChange, (state, { payload }) => {
    return { ...state, ...payload }
  })
  .on(pushWizardStepToBackend, (state, url) => console.log(state, url))

export { pushError, clearErros, setInitialValue, submitChange, pushWizardStepToBackend }
