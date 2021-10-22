import React, { useContext } from 'react'
import { useSaveEventApi, UseSaveEventApiResult } from './hooks/useSubmitEventApi'

const SaveEventContext = React.createContext<UseSaveEventApiResult | null>(null)

export const SaveEventProvider: React.FC = ({ children }) => {
  const value = useSaveEventApi()
  return <SaveEventContext.Provider value={value}>{children}</SaveEventContext.Provider>
}

export function useSaveEvent(): UseSaveEventApiResult {
  const value = useContext(SaveEventContext)
  if (!value) {
    throw new Error("You can't use save event outside SaveEventProvider")
  }
  return value
}
