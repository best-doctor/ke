import React, { ComponentProps, FC } from 'react'

import { MapProviderContext } from './MapProviderContext'
import { MapProvider as GoogleProvider } from './providers/GoogleMaps'
import { MapProvider as YandexProvider } from './providers/YandexMaps'

type MapProviderProps = GoogleProviderProps | YandexProviderProps

interface GoogleProviderProps {
  provider: 'google'
  providerProps: ComponentProps<typeof GoogleProvider>
}

interface YandexProviderProps {
  provider: 'yandex'
  providerProps: ComponentProps<typeof YandexProvider>
}

const providerToRootComponent = {
  google: GoogleProvider,
  yandex: YandexProvider,
}

export const MapProvider: FC<MapProviderProps> = ({ provider, providerProps, children }) => {
  const RootProvider = providerToRootComponent[provider]

  // Это обёртка
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    // providerProps соответствует RootProvider согласно исходному типу, но не понятно, как это яснее указать
    <RootProvider {...(providerProps as never)}>
      <MapProviderContext value={provider}>{children}</MapProviderContext>
    </RootProvider>
  )
  /* eslint-enable react/jsx-props-no-spreading */
}
