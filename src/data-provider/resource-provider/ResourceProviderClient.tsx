import React, { useMemo } from 'react'
import {
  DefaultOptions,
  MutationCache,
  QueryCache,
  QueryClient as ReactQueryClient,
  QueryClientProvider,
} from 'react-query'

export interface ResourceProviderClientConfig {
  queryCache?: QueryCache
  mutationCache?: MutationCache
  defaultOptions?: DefaultOptions
}

interface ResourceProviderClientProps {
  children?: React.ReactNode
  config?: ResourceProviderClientConfig
}

export const ResourceProviderClient = ({ children, config }: ResourceProviderClientProps): JSX.Element => {
  const queryClient = useMemo(() => new ReactQueryClient(config), [config])
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
