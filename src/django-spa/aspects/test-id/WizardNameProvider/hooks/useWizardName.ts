import { useContext } from 'react'
import { WizardNameContext, WizardNameContextData } from '../WizardNameProvider'

export function useWizardName(): WizardNameContextData {
  return useContext(WizardNameContext)
}
