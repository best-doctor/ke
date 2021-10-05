import React, { useMemo } from 'react'

export interface WizardNameContextData {
  name?: string
  stepName?: string
}

export const WizardNameContext = React.createContext<WizardNameContextData>({})

export type WizardNameProviderProps = React.PropsWithChildren<WizardNameContextData>

export const WizardNameProvider: React.FC<WizardNameProviderProps> = ({ name, stepName, children }) => {
  const value: WizardNameContextData = useMemo(() => ({ name, stepName }), [name, stepName])
  return <WizardNameContext.Provider value={value}>{children}</WizardNameContext.Provider>
}
